import {  FETCH_AUTHOR_REQUEST } from './constants';

import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAllAuthors = (limit, page, search, redirectUrl) => (dispatch, getState) => {
	let url = `/api/authors`;
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
		key: 'FETCH_AUTHORS',
		name: 'authors',
		url: url,
		dispatch,
		redirectUrl,
		getState
    });
};

export const getAuthor = (id) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_AUTHOR',
		name: 'author',
		url: `/api/authors/${id}`,
		dispatch,
		getState
    });
};

export const getOneBySlug = (slug) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_AUTHOR',
		name: 'author',
		url: `/api/authors/filter/${slug}`,
		dispatch,
		getState
    });
};

export const post = (body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_AUTHOR',
		name: 'author',
		redirectUrl: '/dashboard/auteur',
		params: true,
		url: `/api/authors`,
		token: true,
		body,
		dispatch,
		getState
    });
};

export const edit = (id, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_AUTHOR',
		name: 'author',
		redirectUrl: `/dashboard/auteur/${id}`,
		url: `/api/authors/${id}`,
		token: true,
		body,
		dispatch,
		getState
    });
};

export const remove = (id) => (dispatch, getState) => {
	return apiDelete({
		key: 'DELETE_AUTHOR',
		name: 'authors',
		redirectUrl: '/dashboard/auteurs',
		url: `/api/authors/${id}`,
		token: true,
		id: id,
		dispatch,
		getState
    });
};

export const initialize  = () => (dispatch) => {
	return dispatch({type: FETCH_AUTHOR_REQUEST});
}