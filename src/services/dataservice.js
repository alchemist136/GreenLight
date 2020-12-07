
import NotificationService, {FLEET_LOCATION_CHANGED,BOMB_LOCATION_CHANGED,SHIPS_DESTROYED,BOMB_FIRED} from './notificationservice.js';

let instance = null;
var fleetLocations = new Set();
var bombLocations = new Set();
var shipsLeft = 10;
var bombsLeft = 200;

var ns = new NotificationService();

class DataService {
	
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	getFleetLocations = () => {
		return fleetLocations;
	}
	
	
	getShipsLeft = () => {
		return shipsLeft;
	}
	
	getBombsLeft = () => {
		return bombsLeft;
	}
	
	getNoOfFleetLocations = () => {
		return fleetLocations.size;
	}
	
	getNoOfBombLocations = () => {
		return bombLocations.size;
	}
 	
	addToFleetLocation = (coordinate) => {
		fleetLocations.add(coordinate);
		ns.postNotification(FLEET_LOCATION_CHANGED,fleetLocations);
	}
	removeFromFleetLocation = (coordinate) => {
		fleetLocations.delete(coordinate);
		ns.postNotification(FLEET_LOCATION_CHANGED,fleetLocations);
	}
	
	addToBombLocation = (coordinate) => {
		bombLocations.add(coordinate);
		ns.postNotification(BOMB_LOCATION_CHANGED,bombLocations);
	}
	
	removeFromBombLocation = (coordinate) => {
		bombLocations.delete(coordinate);
		ns.postNotification(BOMB_LOCATION_CHANGED,bombLocations);
	}
	
	shipsDestroyed = (noOfShips) => {
		shipsLeft -= noOfShips; 
		ns.postNotification(SHIPS_DESTROYED,noOfShips);
	}
	
	bombsFired = (noOfBombs) => {
		bombsLeft -= noOfBombs;
		ns.postNotification(BOMB_FIRED,noOfBombs);
	}
	
	resetBombLocations = () => {
		bombLocations = new Set();
	}
	
	resetFleetLocations = () => {
		fleetLocations = new Set();
	}
	
}

export default DataService;