export const FLEET_LOCATION_CHANGED = 'fleet_location_changed';
export const BOMB_LOCATION_CHANGED = 'bomb_location_changed';
export const SHIPS_DESTROYED = 'ships_destroyed';
export const BOMB_FIRED = 'bomb_fired';
export const BLOCK_RESET = 'block_reset';
export const BLOCK_BOMBED = 'block_bombed';
export const BLOCK_KILLED = 'block_killed';
export const CHANGE_BUTTON_STATE = 'change-button-state';

var observers = {};
let instance = null;

class NotificationService {
	
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	
	postNotification = (notifName,data) => {
		var obs = observers[notifName];
		if(obs) {
			for(var x=0;x<obs.length;x++) {
				var obj = obs[x];
				obj.callBack(data);
			}
		}
	}
	
	addObserver = (notifName,observer,callBack) => {
		var obs = observers[notifName];
		if(!obs) {
			observers[notifName] = [];
		}
		var obj = {observer: observer, callBack: callBack};
		observers[notifName].push(obj);
	}
	
	removeObserver = (notifName,observer) => {
		var obs = observers[notifName];
		for(var x=0;x<obs.length;x++) {
			if(obs.observer === observer) {
				obs.splice(x,1);
				break;
			}
		}
		observers[notifName] = obs;
	}
	
}

export default NotificationService;