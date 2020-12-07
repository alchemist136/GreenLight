import React,{Component} from 'react';
import './block.css';

import DataService from '../../services/dataservice.js';
import NotificationService,{BLOCK_RESET,BLOCK_BOMBED,BLOCK_KILLED} from '../../services/notificationservice.js'

var ds = new DataService();
var ns = new NotificationService();

class Block extends Component {
	
	constructor(props) {
		super(props);
		this.state = {isClicked: false};
		this.onBlockClicked = this.onBlockClicked.bind(this);
		this.blockKilled = this.blockKilled.bind(this);
		this.blockBombed = this.blockBombed.bind(this);
		this.blockReset = this.blockReset.bind(this);
	}
	
	componentDidMount() {
		var notif_name_reset = BLOCK_RESET + this.props.coordinate;
		var notif_name_bombed = BLOCK_BOMBED + this.props.coordinate;
		var notif_name_killed = BLOCK_KILLED + this.props.coordinate;
		ns.addObserver(notif_name_reset,this,this.blockReset);
		ns.addObserver(notif_name_bombed,this,this.blockBombed);
		ns.addObserver(notif_name_killed,this,this.blockKilled);
	}
	
	componentWillUnmount() {
		var notif_name_reset = BLOCK_RESET + this.props.coordinate;
		var notif_name_bombed = BLOCK_BOMBED + this.props.coordinate;
		var notif_name_killed = BLOCK_KILLED + this.props.coordinate;
		ns.removeObserver(notif_name_reset,this);
		ns.removeObserver(notif_name_bombed,this,this.blockReset);
		ns.removeObserver(notif_name_killed,this,this.blockReset);
	}
	
	blockReset = (id) => {
		var self = this;
		var block = document.getElementById(id);
		block.style = document.getElementsByClassName('block').style;
		block.children[0].style = document.getElementsByClassName('coordinate-name').style;
		ds.removeFromFleetLocation(this.props.coordinate);
		self.setState({isClicked: false});
	}
	
	blockBombed = (id) => {
		var self = this;
		var block = document.getElementById(id);
		block.style.backgroundColor = '#ffff00';
		block.children[0].style.color = '#000';
	}
	
	blockKilled = (id) => {
		var self = this;
		var block = document.getElementById(id);
		block.style.backgroundColor = '#ff0000';
		block.children[0].style.color = '#000';
	}

	onBlockClicked = (noOfFleetLocations) => {
			var self = this;
			var block = document.getElementById(this.props.id);
			if(this.state.isClicked == false) {
				if(noOfFleetLocations >= ds.getShipsLeft()) {
					var messege = 'You cannot select more than ' + ds.getShipsLeft() + ' fleet locations';
					alert(messege);
				}
				else {
					block.style.backgroundColor = '#009900';
					block.children[0].style.color = '#000';
					ds.addToFleetLocation(this.props.coordinate);
				}
			}
			else {
				block.style = document.getElementsByClassName('block').style;
				block.children[0].style = document.getElementsByClassName('coordinate-name').style;
				ds.removeFromFleetLocation(this.props.coordinate);
			}
			self.setState({isClicked: !this.state.isClicked});
		
	}
	
	render() {
		return(
			<div className="card col-sm block" id={this.props.id} onClick={() => this.onBlockClicked(ds.getNoOfFleetLocations())}>
				<p className="coordinate-name">{this.props.row+this.props.col}</p>
			</div>
		)
	}
	
}

export default Block;