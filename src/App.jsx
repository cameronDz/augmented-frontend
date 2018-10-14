import React, { Component } from 'react';
import './styles/App.css';
import './styles/css/bootstrap.css';
import Routine from './components/Routine';
import ExerciseDropdown from './components/ExerciseDropdown';

class App extends Component {

	render() {
		return (
			<div className="container">
			<div className="row">
			
			<div className="col-sm-4">
			<ExerciseDropdown />
			</div>
			<div className="col-sm-4">
			<Routine />
			</div>
			<div className="col-sm-4">
			
			</div>
			</div>
			</div>
		);
	}
}

export default App;
