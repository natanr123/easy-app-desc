import { fromJS } from 'immutable';
import * as constants from './constants';
export const initialState = fromJS({images: {}});

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CONVERTED_IMAGE_CREATED:
      console.log('CONVERTED_IMAGE_CREATEDCONVERTED_IMAGE_CREATEDCONVERTED_IMAGE_CREATED: ',action);
      const images = { ...(state.get('images'))  };
      console.log('imagesimagesimages: ', images);
      images[action.photoType] = action.path;
      return state.set('images', images);
    default:
      return state;
  }
}

export default problemReducer;
