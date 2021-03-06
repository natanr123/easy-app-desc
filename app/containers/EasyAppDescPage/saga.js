import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';

// const host = 'http://localhost:8080';

function sendUploadFile(apiServer, file, photoType) {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${apiServer}/uploads/${photoType}`, formData);
}

function loadAppData(apiServer) {
  return axios.get(`${apiServer}/uploads/1`);
}

function getApiServer() {
  return axios.get('/env').then((res) => {
    return res.data.apiServer;
  });
}

export function* uploadImageWorker(action) {
  console.log('uploadImageWorkeruploadImageWorkeruploadImageWorker');
  const apiServer = yield call(getApiServer);
  console.log('apiServer: ', apiServer);
  const response = yield call(sendUploadFile, apiServer, action.file, action.photoType);
  const { data } = response;
  yield put(actions.convertedImageCreated(`${data.path}`, data.photoType));
}

export function* loadAppDataWorker(action) {
  console.log('loadAppDataWorkerloadAppDataWorkerloadAppDataWorkerloadAppDataWorker');
  const apiServer = yield call(getApiServer);
  console.log('apiServer: ', apiServer);
  const response = yield call(loadAppData, apiServer);
  const { data } = response;
  yield put(actions.appDataLoaded(data));
}


export default function* watcher() {
  yield [takeLatest(constants.UPLOAD_IMAGE, uploadImageWorker),
    takeLatest(constants.LOAD_APP_DATA, loadAppDataWorker)];
}
