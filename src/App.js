import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome.js';

class App extends Component {

	render() {
	    return (
	    	<div className="App">
	      		<Welcome {...welcome} />
	      	</div>
	    );
	}	
}

export default App;
