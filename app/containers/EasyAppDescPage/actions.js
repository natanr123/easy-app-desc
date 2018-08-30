import * as constants from './constants';


export function uploadImage(file) {
  return {
    type: constants.UPLOAD_IMAGE,
    file,
  };
}


export function convertedImageCreated(path) {
  return {
    type: constants.CONVERTED_IMAGE_CREATED,
    path,
  };
}
