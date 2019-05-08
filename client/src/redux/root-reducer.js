import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import userReducer, * as fromUser from './reducers/user';
import errorReducer from './reducers/error';
import authorsReducer from './reducers/authors';
import genresReducer from './reducers/genres';
import booksReducer from './reducers/books';
import usersReducer from './reducers/users';
import profileReducer from './reducers/profile';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: userReducer,
  form: formReducer,
  errors : errorReducer,
  authors : authorsReducer,
  genres : genresReducer,
  books : booksReducer,
  users : usersReducer,
  profile : profileReducer,
})


export const getLocation = state => state.router.location;

export default rootReducer

