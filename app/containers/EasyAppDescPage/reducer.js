import { fromJS } from 'immutable';
import * as constants from './constants';
export const initialState = fromJS({ images: {}, storeListing: { title: '', shortDescription: '', fullDescription: '' } });

function problemReducer(state = initialState, action) {
  let images = null;
  switch (action.type) {
    case constants.CONVERTED_IMAGE_CREATED:
      images = { ...(state.get('images'))  };
      images[action.photoType] = action.path;
      return state.set('images', images);
    case constants.STORE_LISTING_CHANGED: {
      const storeListing = state.get('storeListing').set(action.name, action.value);
      return state.set('storeListing', storeListing);
    }
    default:
      return state;
  }
}

export default problemReducer;
