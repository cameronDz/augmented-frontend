import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
// TODO look into material ui picker
import DatePicker from 'react-datepicker';
import TimeField from 'react-simple-timefield';
import { invalidateCardioMachineSession } from '../../../state/cardioMachineSessions/actions';
import * as _config from '../../../../../assets/data/config.json';
import '../../../../css/creator.css';

// TODO convert hook component
class Creator extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
    // TODO better name for userEndTimeStartDate
    this.state = {
      comment: '',
      distanceMiles: 0.0,
      machineType: '',
      seconds: 0,
      startDate: new Date(),
      timing: '00:00:00',
      useEndTimeStartDate: true,
      userName: ''
    };
  };

  handleDateChange (date) {
    this.setState({
      startDate: date,
      useEndTimeStartDate: false
    });
  };

  handleTimeChange (time) {
    const durationSeconds = this.calulcateTimingSeconds(time);
    this.setState({
      seconds: durationSeconds,
      timing: time
    });

    if (this.state.useEndTimeStartDate) {
      const startTimeMilliseconds = new Date().getTime() - (durationSeconds * 1000);
      const newStartTime = new Date(startTimeMilliseconds);
      this.setState({
        startDate: newStartTime
      });
    }
  };

  handleToggleSwitch () {
    if (!this.state.useEndTimeStartDate) {
      const startTimeMilliseconds = new Date().getTime() - (this.state.seconds * 1000);
      const newStartTime = new Date(startTimeMilliseconds);
      this.setState({
        startDate: newStartTime
      });
    }
    this.setState({
      useEndTimeStartDate: !this.state.useEndTimeStartDate
    });
  }

  calulcateTimingSeconds (time) {
    let calculatedSeconds = 0;
    try {
      const timingArray = time.split(':');
      calculatedSeconds = (Number(timingArray[0] * 3600) + Number(timingArray[1] * 60) + Number(timingArray[2]));
    } catch (error) {
      console.error(error);
    }
    return calculatedSeconds;
  };

  handleSubmit (event) {
    const self = this;
    document.getElementById('submitCardioBtn').disabled = true;
    event.preventDefault();
    const url = _config.apis.azure + 'CardioMachineExercises';

    const payload = {
      comment: self.state.comment,
      distanceMiles: self.state.distanceMiles,
      durationSeconds: self.state.seconds,
      machineType: self.state.machineType,
      startTime: self.state.startDate.toGMTString(),
      userName: self.state.userName
    };

    self.setState({
      comment: '',
      distanceMiles: 0.0,
      machineType: '',
      seconds: 0,
      startDate: new Date(),
      timing: '00:00:00',
      userName: ''
    });

    // TODO move to middleware
    const header = { header: { 'Content-Type': 'application/json' } };
    axios.post(url, payload, header)
      .then(() => {
        self.props.invalidateCardioMachineSession();
      })
      .catch(error => {
        // TODO create modal alert
        console.error(error);
      })
      .finally(() => {
        document.getElementById('submitCardioBtn').disabled = false;
      });
  };

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field is-horizontal">
          <label className="label" htmlFor="machineType">Machine Type &nbsp;</label>
          <input className="input"
            name="machineType"
            onChange={ event => this.setState({ ...this.state, machineType: event.target.value }) }
            required
            type="text"
            value={this.state.machineType} />
        </div>

        <div className="field is-horizontal">
          <label className="label" htmlFor="startDate">Date &nbsp;</label>
          <DatePicker dateFormat="MMMM d, yyyy h:mm aa"
            onChange={this.handleDateChange}
            selected={this.state.startDate}
            showTimeSelect
            timeCaption="time"
            timeFormat="HH:mm"
            timeIntervals={5} />
        </div>

        <div className="field is-horizontal">
          <label className="label">Duration &nbsp;</label>
          <TimeField className="time-field"
            onChange={this.handleTimeChange}
            showSeconds={true}
            style={{ width: 80, height: 25 }}
            value={this.state.timing} />
          <label className="label" htmlFor="distanceMiles">Distance (miles) &nbsp;</label>
          <input className="distance"
            name="distanceMiles"
            onChange={ event => this.setState({ ...this.state, distanceMiles: event.target.value }) }
            step="0.01"
            type="number"
            value={this.state.distanceMiles} />
        </div>

        <div className="field is-horizontal">
          <label className="label toggle-label" htmlFor="useEndTimeStartDate">Session Just End &nbsp;</label>
          <Switch checked={this.state.useEndTimeStartDate}
            color="primary"
            onChange={this.handleToggleSwitch}
            value={this.state.useEndTimeStartDate} />
        </div>

        <div className="field is-horizontal">
          <label className="label" htmlFor="userName">User &nbsp;</label>
          <input className="input"
            name="userName"
            onChange={ event => this.setState({ ...this.state, userName: event.target.value }) }
            required
            type="text"
            value={this.state.userName} />
        </div>

        <div className="field">
          <label className="label" htmlFor="comment">Comment &nbsp;</label>
          <textarea className="textarea"
            name="comment"
            onChange={ event => this.setState({ ...this.state, comment: event.target.value }) }
            type="textarea"
            value={this.state.comment} />
        </div>
        <div className="field">
          <div className="control">
            <input className="input"
              id="submitCardioBtn"
              type="submit"
              value="Submit" />
          </div>
        </div>
      </form>);
  };
}

const mapStateToProps = state => ({ links: state.cardioMachineSessions.links });
export default connect(mapStateToProps, { invalidateCardioMachineSession })(Creator);