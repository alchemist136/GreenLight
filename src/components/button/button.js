import React, {Component} from 'react';
import './button.css';

import Processor from '../../services/processor.js';
import DataSerivce from '../../services/dataservice.js';
import NotificationSerivce,{CHANGE_BUTTON_STATE} from '../../services/notificationservice.js';

var pr = new Processor();
var ds = new DataSerivce();
var ns = new NotificationSerivce();

class Button extends Component {
	
	
	constructor(props) {
		super(props);
		this.state = {disabled: false};
		this.onButtonClicked = this.onButtonClicked.bind(this);
		this.changeButtonState = this.changeButtonState.bind(this);
	}
	
	componentDidMount() {
		ns.addObserver(CHANGE_BUTTON_STATE,this,this.changeButtonState);
	}
	
	componentWillUnmount() {
		ns.removeObserver(CHANGE_BUTTON_STATE,this);
	}
	
	onButtonClicked = () => {
		if(!this.state.disabled) {
			ds.resetBombLocations();
			pr.onFleetMovePlayed();
		}
	}
	
	changeButtonState = (s) => {
		this.state.disabled = s;
	}
	
	render() {
		return(
			<div className="container">
				<button type="button" className="btn btn-outline-success my-btn" onClick={() => this.onButtonClicked()}>{this.props.title}</button>
			</div>
		)
	}
}

export default Button;