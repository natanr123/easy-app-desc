import { fromJS } from 'immutable';
import {

} from './constants';
export const initialState = fromJS({});

function problemReducer(state = initialState, action) {
  switch (action.type) {
    case 'zzzzzzzzzzz':
      console.log('CREATE_PROBLEMCREATE_PROBLEMCREATE_PROBLEMCREATE_PROBLEM');
      return state.set('hello', 'world');
    default:
      return state;
  }
}

export default problemReducer;
