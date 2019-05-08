import { List } from 'immutable';
import { combineReducers } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import {
	FETCH_AUTHORS_SUCCESS,
	FETCH_AUTHORS_REQUEST,
	FETCH_AUTHORS_FAILURE,
	FETCH_AUTHOR_SUCCESS,
	FETCH_AUTHOR_REQUEST,
	FETCH_AUTHOR_FAILURE,
} from '../actions/constants';

const loading = (state = false, action) => {
	switch (action.type) {
		case FETCH_AUTHORS_REQUEST:
			return true;
		case FETCH_AUTHORS_SUCCESS:
		case FETCH_AUTHORS_FAILURE:
			return false;
		default:
			return state;
	}
};

const authors = (state = ImmutableMap({ authors: null }), action) => {
	switch (action.type) {

		case FETCH_AUTHORS_REQUEST:
		return state.clear()
		// case FETCH_AUTHORS_SUCCESS:
		// 	return {
		// 		...state,
		// 		authors: action.authors
		// 	}

		case FETCH_AUTHORS_SUCCESS:
			return state
				.set('authors', action.authors)
		case FETCH_AUTHORS_FAILURE:
			return state
				.set('authors', null)
		// case 'DELETE_AUTHOR_SUCCESS':
		// 	const fileDeletedIndex = state.get('authors').findIndex(k => k.id=== action.authors._id);
		// 	if (fileDeletedIndex !== -1) {
		// 		return state.delete(fileDeletedIndex);
		// 	}
		// 	return state;
		default:
			return state
  }
}

const author = (state = ImmutableMap({ author: null }), action) => {
	switch (action.type) {
		case FETCH_AUTHOR_REQUEST:
			return state.clear();
		case FETCH_AUTHOR_SUCCESS:
			return state
				.set('author', action.author)
		case FETCH_AUTHOR_FAILURE:
			return state
				.set('author', null)
		default:
			return state
  }
}


export default combineReducers({
  loading: loading,
  data: authors,
  author: author
});  
  // export const getAuthors = state => state.authors;
  