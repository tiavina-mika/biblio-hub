import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import userReducer, * as fromUser from './reducers/user.js';
import errorReducer from './reducers/error.js';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  form: formReducer,
  errors : errorReducer
})


export const getLocation = state => state.router.location;

export default rootReducer

