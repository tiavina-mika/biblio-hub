import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Map as ImmutableMap } from 'immutable';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { getStorage } from '../utils/local-storage';

// import { getStorage } from '../utils/local-storage';

import rootReducer from './root-reducer';

export const history = createBrowserHistory();

let authenticated = getStorage('authenticated');

const initialState = {
  user:  ImmutableMap({
    authenticated: authenticated
    ? authenticated === 'true'
      ? true
      : false
    : false,
    id: getStorage('id') || '',
    email: getStorage('email') || '',
    isAdmin: Boolean(getStorage('isAdmin')) || '',
  })
};


const configStore = () => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
      rootReducer(history),
      initialState,
      composeEnhancer(
          applyMiddleware(
              routerMiddleware(history),
              thunk
          )
      )
  ); 
  return store;
}


export default configStore;
