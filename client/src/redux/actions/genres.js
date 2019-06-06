import { FETCH_GENRE_REQUEST } from './constants';

import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAllGenres = (limit, page, search, redirectUrl) => (dispatch, getState) => {
	let url = `/api/genres`;
	if(limit) {
		url += `?limit=${limit}`;
	}
	if (page) {
		url += `&page=${page}`;
	}
	if (search) {
		url += `&search=${search}`;
	}
	return apiGet({
		key: 'FETCH_GENRES',
		name: 'genres',
		url: url,
		redirectUrl,
		dispatch,
		getState
    });
};

export const getOneBySlug = (slug) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_GENRE',
		name: 'genre',
		url: `/api/genres/filter/${slug}`,
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
		token: true,
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
		token: true,
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
		token: true,
		id: id,
		dispatch,
		getState
    });
};

export const initialize  = () => (dispatch, getState) => {
	return dispatch({type: FETCH_GENRE_REQUEST})
}