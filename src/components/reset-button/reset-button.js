import React,{Component} from 'react';
import './reset-button.css';

class ResetButton extends Component {
	
	constructor(props) {
		super(props);
	}
	
	onButtonClicked = () => {
		window.location.reload();
	}
	
	render() {
		return(
			<button type="button" class="btn btn-outline-success reset-button" onClick={() => {this.onButtonClicked()}}>{this.props.title}</button>
		)
	}
	
}

export default ResetButton;