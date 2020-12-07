import React,{Component} from 'react';
import './status-panel-left.css';
import DataService from '../../services/dataservice.js';

import NotificationService,{FLEET_LOCATION_CHANGED,SHIPS_DESTROYED} from '../../services/notificationservice.js';

var ns = new NotificationService();
var ds = new DataService();

class StatusPanelLeft extends Component {
	
	constructor(props) {
		super(props);
		this.state = {fleetLocations: new Set(), shipsLeft: 10};
		this.onFleetLocationsChanged = this.onFleetLocationsChanged.bind(this);
		this.onShipDestroyed = this.onShipDestroyed.bind(this);
	}
	
	componentDidMount() {
		ns.addObserver(FLEET_LOCATION_CHANGED, this, this.onFleetLocationsChanged);
		ns.addObserver(SHIPS_DESTROYED, this, this.onShipDestroyed);
	}
	
	componentWillUnmount() {
		ns.removeObserver(FLEET_LOCATION_CHANGED,this);
		ns.removeObserver(SHIPS_DESTROYED,this);
	}
	
	
	onFleetLocationsChanged(newFleetLocations) {
		this.setState({fleetLocations: newFleetLocations});
	}
	
	onShipDestroyed = (noOfShipsDestroyed) => {
		this.setState({shipsLeft: (this.state.shipsLeft - noOfShipsDestroyed)});
	}
	
	
	displayFleetLocations = () => {
		var locations = "";
		this.state.fleetLocations.forEach((location) => {
			locations += location + " ";
		});
		return (locations);
	}
	
	
	render() {
		return (
			<div className="card status-panel-left">
				<h1>{this.props.sideTitle}</h1>
				<p>Ships Left : {this.state.shipsLeft}</p>
				<p>Fleet Locations : {this.displayFleetLocations()}</p>
			</div>
		)
	}
	
}

export default StatusPanelLeft;