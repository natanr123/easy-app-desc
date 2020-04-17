import * as constants from './constants';


export function uploadImage(file, photoType) {
  return {
    type: constants.UPLOAD_IMAGE,
    file,
    photoType,
  };
}

export function loadAppData() {
  return {
    type: constants.LOAD_APP_DATA
  };
}

export function appDataLoaded() {
  return {
    type: constants.LOAD_APP_DATA
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


export function loadLocalStorage(storeListing, images) {
  return {
    type: constants.LOAD_LOCAL_STORAGE,
    storeListing,
    images,
  };
}
