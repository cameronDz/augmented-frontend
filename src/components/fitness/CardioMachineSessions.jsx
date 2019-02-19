import React, { Component } from 'react';
import CardioMachineModalButton from './CardioMachineModalButton';
import CardioMachineTablePagination from './CardioMachineTablePagination';
import '../../styles/css/cardio.css';
import {apis} from  '../../api.js';
import { connect } from 'react-redux';

import { fetchSessionsIfNeeded } from '../../actions/cardioMachineSessionAction';

/**
 * Display of cardio machine sessions on a table.
 */
class CardioMachineSessions extends Component {

  componentDidMount() {
    function  processPayload(payLoad)  {
      var array = [];
      for(var i = 0; i < payLoad.length; i++) {
        var counter = payLoad[i];
        var obj = {};
        obj.machineType = counter.machineType;
        obj.startTime = counter.startTime;
        obj.duration = counter.durationSeconds;
        obj.distance = counter.distanceMiles;
        obj.userName = counter.userName;
        obj.comment = counter.comment;
        array.push(obj);
      }
      return array;
    };
    console.log("STATE CMS: " + JSON.stringify(this.state));
    console.log("PROPS CMS: " + JSON.stringify(this.props));

    var url = apis().azure + 'CardioMachineExercises';
    var pageNumber = 1;
    var pageSize = 10;
    var params = '?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    let link = url + params;
    this.props.dispatchFetchSessions(link);
    fetch(link)
      .then(response => response.json())
      .then(data => this.setState({
        //cardioSessions: processPayload(data.data),
        currentPage: data.meta._currentPage,
        totalPages: data.meta._totalPages,
        links: data.links
      })
    );
  };

  /**
   * Renders the sessions as a table rows in a table body element.
   */
  renderData() {
    console.log("STATE CMS renderData: " + JSON.stringify(this.state));
    console.log("PROPS CMS renderData: " + JSON.stringify(this.props));
    const cardioMachineSessionTableRow = this.props.sessions.map(
      (element, index) => {
        let date = element.startTime.split('T')[0];
        return (
          <tr key={index}>
            <td>{date}</td>
            <td>{element.machineType}</td>
            <td>{element.userName}</td>
            <CardioMachineModalButton {...element} />
          </tr>
        );
    }); 

    return (
      <tbody>
        {cardioMachineSessionTableRow}
      </tbody>
    );
  };

  /**
   * Component UI display.
   */
  render() {
    return (
      <div>
        <div className="table-wrapper">
          <table className="table is-bordered is-striped is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>Date</th>
                <th>Machine</th>
                <th>User</th>
                <th>Details</th>
              </tr>
            </thead>
            {this.renderData()}
	        </table>
        </div>
        <CardioMachineTablePagination />
      </div>
    );
  }
}

const mapStateToProps = state =>  ({
  links: state.cardioMachineSessions.cardioMachineSessions.links,
  totalRecords: state.cardioMachineSessions.cardioMachineSessions.totalRecords,
  totalPages: state.cardioMachineSessions.cardioMachineSessions.totalPages,
  currentPage: state.cardioMachineSessions.cardioMachineSessions.currentPage,
  sessions: state.cardioMachineSessions.cardioMachineSessions.sessions,
  isFetching: state.cardioMachineSessions.cardioMachineSessions.isFetching,
  didInvalidate: state.cardioMachineSessions.cardioMachineSessions.didInvalidate,
  lastUpdated: state.cardioMachineSessions.cardioMachineSessions.lastUpdated
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchSessions: (link) => {
      dispatch(fetchSessionsIfNeeded(link));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardioMachineSessions);
