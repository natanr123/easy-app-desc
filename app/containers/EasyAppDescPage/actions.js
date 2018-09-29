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

export function storeListingChanged(name, value) {
  return {
    type: constants.STORE_LISTING_CHANGED,
    name,
    value,
  };
}


export function loadLocalStorage() {
  return {
    type: constants.LOAD_LOCAL_STORAGE,
  };
}
