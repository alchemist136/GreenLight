import React,{Component} from 'react';
import './status-panel-right.css';

import NotificationService,{BOMB_LOCATION_CHANGED,BOMB_FIRED,SHIPS_DESTROYED} from '../../services/notificationservice.js';
import DataService from '../../services/dataservice.js';

var ns = new NotificationService();
var ds = new DataService();

class StatusPanelRight extends Component {
	
	constructor(props) {
		super(props);
		this.state = {bombLocations: new Set(), bombsLeft: 200, shipsDestroyed: 0};
		this.onBombFired = this.onBombFired.bind(this);
		this.onBombLocationsChanged = this.onBombLocationsChanged.bind(this);
		this.onShipDestroyed = this.onShipDestroyed.bind(this);
	}
	
	componentDidMount() {
		ns.addObserver(BOMB_LOCATION_CHANGED, this, this.onBombLocationsChanged);
		ns.addObserver(BOMB_FIRED, this, this.onBombFired);
		ns.addObserver(SHIPS_DESTROYED, this, this.onShipDestroyed);
	}
	
	componentWillUnmount() {
		ns.removeObserver(BOMB_LOCATION_CHANGED,this);
		ns.removeObserver(BOMB_FIRED,this);
		ns.removeObserver(SHIPS_DESTROYED, this);
	}
	
	onBombLocationsChanged(newBombLocations) {
		this.setState({bombLocations: newBombLocations});
	}
	
	onBombFired = (noOfBombsFired) => {
		this.setState({bombsLeft: (this.state.bombsLeft - noOfBombsFired)});
	}
	
	onShipDestroyed = (noOfShipsDestroyed) => {
		this.setState({shipsDestroyed: (this.state.shipsDestroyed+noOfShipsDestroyed)});
	}
	
	displayBombLocations = () => {
		var locations = "";
		this.state.bombLocations.forEach((location) => {
			locations += location + " ";
		});
		return locations;
	}
	
	render() {
		return (
			<div className="card status-panel-right">
				<h1>{this.props.sideTitle}</h1>
				<p>Bombs Left : {this.state.bombsLeft}</p>
				<p>Bomb Locations : {this.displayBombLocations()}</p>
				<p>Ships Destroyed: {this.state.shipsDestroyed}</p>
			</div>
		)
	}
	
}

export default StatusPanelRight;