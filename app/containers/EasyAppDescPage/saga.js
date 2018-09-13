import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';


function sendUploadFile(file, photoType) {
  console.log('ssssssssssssssssssssssss');
  const formData = new FormData();
  formData.append('file', file);
  const host = 'http://localhost:3001';
  return axios.post(`${host}/uploads/${photoType}`, formData);
}

export function* uploadImageWorker(action) {
  const response = yield call(sendUploadFile, action.file, action.photoType);
  yield put(actions.convertedImageCreated(response.data.path));
}

export default function* watcher() {
  yield takeLatest(constants.UPLOAD_IMAGE, uploadImageWorker);
}
