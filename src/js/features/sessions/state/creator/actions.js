import axios from 'axios';
import { invalidateCardioMachineSession } from '../actions';
import * as _types from '../types';
import * as _config from '../../../../../../assets/data/config.json';

const recieveCardioMachineSessionPostResponse = () => {
  return { type: _types.RECIEVE_CARDIO_MACHINE_SESSION_POST_RESPONSE };
};

const recieveSuccessfulCardioMachineSessionPostResponse = () => {
  return { type: _types.RECIEVE_SUCCESSFUL_CARDIO_MACHINE_SESSION_POST_RESPONSE };
};

const sendCardioMachineSessionPostRequest = () => {
  return { type: _types.SEND_CARDIO_MACHINE_SESSION_POST_REQUEST };
};

const updateCardioMachineSessionPostRequest = update => {
  return { update, type: _types.UPDATE_CARDIO_MACHINE_SESSION_POST_REQUEST };
};

export const updateCardioMachineSessionPostForm = update => {
  return dispatch => {
    dispatch(updateCardioMachineSessionPostRequest(update));
  };
};

export const postCardioMachineSession = formData => {
  return dispatch => {
    const config = { header: { 'Content-Type': 'application/json' } };
    const url = _config.apis.azure + 'CardioMachineExercises';
    const payload = {
      comment: formData.comment,
      distanceMiles: formData.distanceMiles,
      durationSeconds: formData.seconds,
      machineType: formData.machineType,
      startTime: formData.startDate.toGMTString(),
      userName: formData.userName
    };
    dispatch(sendCardioMachineSessionPostRequest());
    axios.post(url, payload, config)
      .then(() => {
        dispatch(invalidateCardioMachineSession());
        dispatch(recieveSuccessfulCardioMachineSessionPostResponse());
      })
      .catch(error => {
        console.error('could not create record', error);
      })
      .finally(() => {
        dispatch(recieveCardioMachineSessionPostResponse());
      });
  };
};
