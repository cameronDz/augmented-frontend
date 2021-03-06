import React, { useEffect, useState, Fragment } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

import Card from '../../components/bulmaCard';
import Layout from '../../components/layout';
import Page from '../../components/page';
import Routine from './components/fullRoutine';
import { fetchRoutineList } from './state/actions';

const propTypes = {
  routine: PropType.shape({
    isFetchingRountines: PropType.bool,
    rountineError: PropType.any,
    routineList: PropType.array
  }),
  fetchRoutineList: PropType.func
};

const routinePage = ({ fetchRoutineList, routine }) => {
  const sideBarTitle = 'Routine List';
  const routineTitle = 'Latest Routine';

  const [currentId, setCurrentId] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [routineList, setRoutineList] = useState(null);

  useEffect(() => {
    fetchRoutineList();
  }, []);

  useEffect(() => {
    setIsFetching(!!routine.isFetchingRountines);
  }, [routine.isFetchingRountines]);

  useEffect(() => {
    const list = (Array.isArray(routine.routineList)) ? routine.routineList : null;
    setRoutineList(list);
  }, [routine.routineList]);

  useEffect(() => {
    const current = ((Array.isArray(routineList)) && (routineList.length > 0)) ? routineList[0] : null;
    const id = current ? current.id : '';
    setCurrentId(id);
    setCurrentRoutine(current);
  }, [routineList]);

  const getRoutineStyle = (id = '') => {
    const style = { cursor: 'pointer' };
    if (id === currentId) {
      style.backgroundColor = 'lightgray';
      style.cursor = 'default';
    }
    return style;
  };

  const handleRoutineClick = (event) => {
    const id = ((!!event) && (!!event.currentTarget) && (!!event.currentTarget.dataset)) ? event.currentTarget.dataset.id : -1;
    if ((!!id) && (id !== currentId)) {
      const current = Array.isArray(routineList) && routineList.find((item) => ((!!item) && (item.id === id)));
      if (current) {
        setCurrentId(id);
        setCurrentRoutine(current);
      }
    }
  };

  const getRoutineSideBarChild = () => {
    return (isFetching)
      ? <p style={{ fontStyle: 'italic' }}>Loading...</p>
      : <Fragment>
        <ul>
          {
            Array.isArray(routineList) && routineList.map((item, key) => {
              return ((!!item) && (!!item.id) && (!!item.name)) && (
                <li onClick={handleRoutineClick} data-id={item.id} key={key} style={getRoutineStyle(item.id)}>
                  {item.name}
                </li>);
            })
          }
        </ul>
      </Fragment>;
  };

  const getRoutineChild = () => {
    return <Routine currentRoutine={currentRoutine} isFetching={isFetching} />;
  };

  const createTab = () => {
    return (
      <Layout isFooterHidden={true} isHeaderHidden={true} title='Routines Page'>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Routines Page</p>
          </header>
          <div className="card-content columns is-tablet">
            <div className="content column is-one-third">
              <Card child={getRoutineSideBarChild()} title={sideBarTitle} />
            </div>
            <div className="content column is-two-thirds">
              <Card child={getRoutineChild()} title={routineTitle} />
            </div>
          </div>
        </div>
      </Layout>);
  };

  return <Page tabNames={['Overview']} tabPanels={[createTab()]} />;
};

routinePage.propTypes = propTypes;
const mapStateToProps = state => ({ routine: state.routine });
export default connect(mapStateToProps, { fetchRoutineList })(routinePage);
