import * as constants from './constants';


export function uploadImage(file, photoType) {
  return {
    type: constants.UPLOAD_IMAGE,
    file,
    photoType,
  };
}


export function convertedImageCreated(path, photoType) {
  return {
    type: constants.CONVERTED_IMAGE_CREATED,
    path,
    photoType,
  };
}
