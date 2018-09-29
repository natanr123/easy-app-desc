import { fromJS } from 'immutable';


export const loadState = (store) => (next) => (action) => {
  // We need the try block because user may not permit our accessing localStorage.
  return next(action);
  /*
  const serializedState = localStorage.getItem('state');
  if (serializedState === null) { // The key 'state' does not exist.
    return next(action);
  }
  if (!(store.getState().get('easyAppDesc'))) {
    return next(action);
  }
  const obj = JSON.parse(serializedState);
  const im = fromJS(obj);
  console.log('iiiiiiiiiiiiiiii: ', im);
  return undefined;
  */
};

/*
export const saveState = (state) => {
  console.log('saveStatesaveStatesaveStatesaveState: ', state);

  try {
    // Serialize the state. Redux store is recommended to be serializable.
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

  } catch (error) {
    console.log(error);
  }

};
*/
export const logger = (store) => (next) => (action) => {
  console.log('logger dispatching', action);
  const result = next(action);
  console.log('logger next state', store.getState());
  return result;
};

export const saveState = (store) => (next) => (action) => {
  console.log('saveState dispatching', action);
  const result = next(action);
  const easyAppDesc = store.getState().get('easyAppDesc');
  if (!easyAppDesc) {
    console.log('No easy app desc');
    return result;
  }
  const jsObj = easyAppDesc.toObject();
  console.log('jsObj: ', jsObj);
  localStorage.setItem('state', JSON.stringify(jsObj));

  return result;
};
