import { FETCH_GENRE_REQUEST } from './constants';

import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAllGenres = (search) => (dispatch, getState) => {
	const url = search ? `/api/genres?search=${search}` : `/api/genres` ;
	return apiGet({
		key: 'FETCH_GENRES',
		name: 'genres',
		url: url,
		dispatch,
		getState
    });
};

export const getGenre = (id) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_GENRE',
		name: 'genre',
		url: `/api/genres/${id}`,
		dispatch,
		getState
    });
};


export const post = (body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_GENRE',
		name: 'genre',
		redirectUrl: '/dashboard/genre',
		params: true,
		url: `/api/genres`,
		body,
		dispatch,
		getState
    });
};

export const edit = (id, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_GENRE',
		name: 'genre',
		redirectUrl: `/dashboard/genre/${id}`,
		url: `/api/genres/${id}`,
		body,
		dispatch,
		getState
    });
};

export const remove = (id) => (dispatch, getState) => {

	return apiDelete({
		key: 'DELETE_GENRE',
		name: 'genres',
		redirectUrl: '/dashboard/genres',
		url: `/api/genres/${id}`,
		id: id,
		dispatch,
		getState
    });
};

export const initialize  = () => (dispatch, getState) => {
	return dispatch({type: FETCH_GENRE_REQUEST})
}



