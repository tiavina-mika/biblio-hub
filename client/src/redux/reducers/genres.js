import { combineReducers } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import {
	FETCH_GENRES_SUCCESS,
	FETCH_GENRES_REQUEST,
	FETCH_GENRES_FAILURE,
	FETCH_GENRE_SUCCESS,
	FETCH_GENRE_REQUEST,
	FETCH_GENRE_FAILURE,
} from '../actions/constants';

const loading = (state = false, action) => {
	switch (action.type) {
		case FETCH_GENRES_REQUEST:
			return true;
		case FETCH_GENRES_SUCCESS:
		case FETCH_GENRES_FAILURE:
			return false;
		default:
			return state;
	}
};

const genres = (state = ImmutableMap({ genres: null }), action) => {
	switch (action.type) {

		case FETCH_GENRES_REQUEST:
		    return state.clear()
		case FETCH_GENRES_SUCCESS:
			return state
				.set('genres', action.genres)
		case FETCH_GENRES_FAILURE:
			return state
				.set('genres', null)
		default:
			return state
  }
}

const genre = (state = ImmutableMap({ genre: null }), action) => {
	switch (action.type) {
		case FETCH_GENRE_REQUEST:
			return state.clear();
		case FETCH_GENRE_SUCCESS:
			return state
				.set('genre', action.genre)
		case FETCH_GENRE_FAILURE:
			return state
				.set('genre', null)
		default:
			return state
  }
}


export default combineReducers({
  loading: loading,
  data: genres,
  genre: genre
});  