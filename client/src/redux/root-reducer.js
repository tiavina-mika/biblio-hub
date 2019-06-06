import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authReducer, * as fromAuth from './reducers/auth';
import errorReducer from './reducers/error';
import authorsReducer, * as fromAuthors from './reducers/authors';
import genresReducer, * as fromGenres from './reducers/genres';
import booksReducer, * as fromBooks from './reducers/books';
import usersReducer, * as fromUsers from './reducers/users';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user: authReducer,
  form: formReducer,
  errors : errorReducer,
  authors : authorsReducer,
  genres : genresReducer,
  books : booksReducer,
  users : usersReducer,
})

export const getLocation = state => state.router.location;

export const getAuthenticated = state => fromAuth.getAuthenticated(state.user);
export const getUserEmail = state => fromAuth.getUserEmail(state.user);
export const getUserId = state => fromAuth.getUserId(state.user);
export const getIsAdmin = state => fromAuth.getIsAdmin(state.user);

export const getGenres = state => fromGenres.getGenres(state.genres);
export const getGenreState = state => fromGenres.getGenre(state.genres);
export const getGenresLoading = state => fromGenres.getGenresLoading(state.genres);

export const getBooks = state => fromBooks.getBooks(state.books);
export const getBookState = state => fromBooks.getBook(state.books);
export const getBooksLoading = state => fromBooks.getBooksLoading(state.books);

export const getAuthors = state => fromAuthors.getAuthors(state.authors);
export const getAuthorState = state => fromAuthors.getAuthor(state.authors);
export const getAuthorsLoading = state => fromAuthors.getAuthorsLoading(state.authors);

export const getUsers = state => fromUsers.getUsers(state.users);
export const getUserState = state => fromUsers.getUser(state.users);
export const getUsersLoading = state => fromUsers.getUsersLoading(state.users);

export default rootReducer