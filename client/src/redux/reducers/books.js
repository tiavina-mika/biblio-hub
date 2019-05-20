import { List } from 'immutable';
import { combineReducers } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import {
	FETCH_BOOKS_SUCCESS,
	FETCH_BOOKS_REQUEST,
	FETCH_BOOKS_FAILURE,
	FETCH_BOOK_SUCCESS,
	FETCH_BOOK_REQUEST,
	FETCH_BOOK_FAILURE,
} from '../actions/constants';

const loading = (state = false, action) => {
	switch (action.type) {
		case FETCH_BOOKS_REQUEST:
			return true;
		case FETCH_BOOKS_SUCCESS:
		case FETCH_BOOKS_FAILURE:
			return false;
		default:
			return state;
	}
};

const books = (state = ImmutableMap({ books: null }), action) => {
	switch (action.type) {

		case FETCH_BOOKS_REQUEST:
		return state.clear()

		case FETCH_BOOKS_SUCCESS:
			return state
				.set('books', action.books)
		case FETCH_BOOKS_FAILURE:
			return state
				.set('books', null)
		default:
			return state
  }
}

const book = (state = ImmutableMap({ book: null }), action) => {
	switch (action.type) {
		case FETCH_BOOK_REQUEST:
			return state.clear();
		case FETCH_BOOK_SUCCESS:
			return state
				.set('book', action.book)
		case FETCH_BOOK_FAILURE:
			return state
				.set('book', null)
		default:
			return state
  }
}

export default combineReducers({
  loading: loading,
  data: books,
  book: book
}); 

export const getBook = state => state.book.get('book');
export const getBooks = state => state.data.get('books');
export const getBooksLoading = state => state.loading;
  