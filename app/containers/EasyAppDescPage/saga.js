import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';

const host = 'http://localhost:3001';

function sendUploadFile(file, photoType) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${host}/uploads/${photoType}`, formData);
}

export function* uploadImageWorker(action) {
  const response = yield call(sendUploadFile, action.file, action.photoType);
  const data = response.data;
  yield put(actions.convertedImageCreated(`${data.path}`, data.photoType));
}

export default function* watcher() {
  yield takeLatest(constants.UPLOAD_IMAGE, uploadImageWorker);
}
