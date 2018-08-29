import * as constants from './constants';


export function uploadImage(file) {
  return {
    type: constants.UPLOAD_IMAGE,
    file,
  };
}

