
import DataService from '../services/dataservice.js';

var ds = new DataService();

let instance = null;

class DefenceSubmarine {
	
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	
	playMove = () => {
		var coordinates = [];
		for(var x=0;x<20;x++) {
			var temp = [];
			temp.push(Math.floor(Math.random()*10));
			temp.push(Math.floor(Math.random()*10));
			coordinates.push(String.fromCharCode(65+temp[0])+(temp[1]+1).toString());
		}
		return coordinates;
	}
	
}

export default DefenceSubmarine;