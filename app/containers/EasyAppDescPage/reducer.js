import { fromJS } from 'immutable';
import * as constants from './constants';
export const initialState = fromJS( {image512path: ''} );

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case constants.CONVERTED_IMAGE_CREATED:
      console.log('CONVERTED_IMAGE_CREATEDCONVERTED_IMAGE_CREATEDCONVERTED_IMAGE_CREATED: ',action);
      return state.set('image512path', action.path);
    default:
      return state;
  }
}

export default problemReducer;
