import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const post = (userId, body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_USER_PROFILE',
		name: 'profile',
		redirectUrl: `/dashboard/profile/${userId}`,
		url: `/api/users/${userId}/profile`,
		body,
		dispatch,
		getState
    });
};

export const edit = (userId, id, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_USER_PROFILE',
		name: 'profile',
		redirectUrl: `/dashboard/profile/${userId}`,
		url: `/api/users/${userId}/profile/${id}`,
		body,
		dispatch,
		getState
    });
};
