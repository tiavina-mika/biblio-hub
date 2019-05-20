import { FETCH_USER_REQUEST, BASE_URL } from './constants';
import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAllUsers = (limit, page, search, redirectUrl) => (dispatch, getState) => {
	let url = `/api/users`;
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
		key: 'FETCH_USERS',
		name: 'users',
		url: url,
		redirectUrl,
		dispatch,
		getState
    });
};

export const getOne = (id) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_USER',
		name: 'user',
		url: `/api/users/${id}`,
		dispatch,
		getState
    });
};


export const post = (body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_USER',
		name: 'user',
		redirectUrl: '/dashboard/utilisateur',
		params: true,
		url: `/api/users`,
		body,
		dispatch,
		getState
    });
};

export const edit = (id, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_USER',
		name: 'user',
		redirectUrl: `/dashboard/utilisateur/${id}`,
		url: `/api/users/${id}`,
		body,
		dispatch,
		getState
    });
};

export const remove = (id) => (dispatch, getState) => {
	return apiDelete({
		key: 'DELETE_USER',
		name: 'users',
		redirectUrl: '/dashboard/utilisateurs',
		url: `/api/users/${id}`,
		id: id,
		dispatch,
		getState
    });
};

export const addProfile = (userId, body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_USER_PROFILE',
		name: 'profile',
		redirectUrl: `/dashboard/utilisateur/${userId}`,
		url: `api/users/${userId}/profile`,
		body,
		dispatch,
		getState
    });
};


export const initialize  = () => (dispatch, getState) => {
	return dispatch({type: FETCH_USER_REQUEST})
}



