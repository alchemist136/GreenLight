import DataService from './dataservice.js';
import NotificationService,{SHIPS_DESTROYED,BOMB_FIRED,BLOCK_RESET,BLOCK_BOMBED,BLOCK_KILLED,CHANGE_BUTTON_STATE} from './notificationservice.js';
import DefenceSubmarine from '../autoplay/defence-submarine';


let instance = null;

var ds = new DataService();
var ns = new NotificationService();
var sub = new DefenceSubmarine();

class Processor {
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	
	onFleetMovePlayed = () => {
		if(ds.getNoOfFleetLocations() != ds.getShipsLeft()) {
			var messege = 'Select '+ds.getShipsLeft()+' Locations! ('+ds.getNoOfFleetLocations()+' selected)'
			alert(messege);
		}
		else if(ds.getBombsLeft() <=0) {
			alert('Bomb Exhausted');
		}
		else {
			var bombLocations = sub.playMove();
			for(var i=0;i<bombLocations.length;i++) {
				ds.addToBombLocation(bombLocations[i]);
			}
			var fleetLocations = ds.getFleetLocations();
			var shipsDestroyed = [];
			for(let ship of fleetLocations) {
				for(var i=0;i<bombLocations.length;i++) {
					if(bombLocations[i] === ship) {
						shipsDestroyed.push(ship);
						break;
					}
				}
			}
			
			setTimeout(() => {
				for(var i=0;i<shipsDestroyed.length;i++) {
				var notif_name_reset = BLOCK_RESET+shipsDestroyed[i];
				ns.postNotification(notif_name_reset,shipsDestroyed[i]);
				}
				for(var i=0;i<bombLocations.length;i++) {
				var notif_name_reset = BLOCK_RESET+bombLocations[i];
				ns.postNotification(notif_name_reset,bombLocations[i]);
				}
				ns.postNotification(CHANGE_BUTTON_STATE,false);
			},3000);
			
			for(var i=0;i<bombLocations.length;i++) {
				var notif_name_bombed = BLOCK_BOMBED+bombLocations[i];
				ns.postNotification(notif_name_bombed,bombLocations[i]);
			}
			
			for(var i=0;i<shipsDestroyed.length;i++) {
				var notif_name_killed = BLOCK_KILLED+shipsDestroyed[i];
				ns.postNotification(notif_name_killed,shipsDestroyed[i]);
			}
			ds.shipsDestroyed(shipsDestroyed.length);
			ds.bombsFired(bombLocations.length);
			ns.postNotification(CHANGE_BUTTON_STATE,true);
		}
	}
 	
}

export default Processor;