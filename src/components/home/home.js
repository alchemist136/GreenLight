import React,{Component} from 'react';
import './home.css';

//Components
import Block from '../block/block.js';
import StatusPanelLeft from '../status-panel-left/status-panel-left.js';
import StatusPanelRight from '../status-panel-right/status-panel-right.js';
import Button from '../button/button.js';
import ResetButton from '../reset-button/reset-button.js';

class Home extends Component {
	
	constructor(props) {
		super(props);
		this.loadGrid = this.loadGrid.bind(this);
	}
	
	loadGrid = () => {
		var grid = [];
		for(var i=0;i<10;i++) {
			var row = [];
			for(var j=0;j<10;j++) {
				row.push(<Block row={String.fromCharCode(65+i)} col={j+1} id={String.fromCharCode(65+i)+(j+1).toString()} coordinate={String.fromCharCode(65+i)+(j+1).toString()} />);
			}
			grid.push(<div className="row">{row}</div>);
		}
		return grid;
	}
	
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-3">
						<StatusPanelLeft sideTitle="Fleet" />
					</div>
					<div className="container grid col-sm-6">
						{this.loadGrid()}
						<Button title='Play Move' />
					</div>
					<div className="col-sm-3">
						<StatusPanelRight sideTitle="Defence" />
					</div>
				</div>
				
			</div>
		)
	}
	
}
export default Home;
