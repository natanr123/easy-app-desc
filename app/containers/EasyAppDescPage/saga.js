import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
// import { createProblem, problemCreated, errorCreatingProblem } from './actions';
import * as constants from './constants';


function sendUploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/uploads', formData);
}

export function* uploadImageWorker(action) {
  const response = yield call(sendUploadFile, action.file);
  console.log('rrrrrrrrr: ', response);
  //yield put(problemCreated());
}

export default function* watcher() {
  yield takeLatest(constants.UPLOAD_IMAGE, uploadImageWorker);
}
