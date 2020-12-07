import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Components
import Home from '../components/home/home.js';

class App extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' exact component={Home} />
				</Switch>
			</Router>
		)
	}
	
}

export default App;
