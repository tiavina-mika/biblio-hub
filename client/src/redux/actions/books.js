import axios from 'axios';
import { push } from 'connected-react-router';
import { FETCH_BOOKS_SUCCESS, FETCH_BOOKS_REQUEST, FETCH_BOOKS_FAILURE, FETCH_BOOK_REQUEST, BASE_URL } from './constants';

import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAll = (limit, page, publish, member, search, redirectUrl) => (dispatch, getState) => {
	let url = `/api/books`;
	
	if(limit) {
		url += `?limit=${limit}`;
	}
	if (page) {
		url += `&page=${page}`;
	}
	if(publish && typeof(publish) === 'boolean') {
		url += `&publish=${publish}`;
	}
	if(member && typeof(member) === 'boolean') {
		url += `&member=${member}`;
	}
	if (search) {
		url += `&search=${search}`;
	}
	return apiGet({
		key: 'FETCH_BOOKS',
		name: 'books',
		url: url,
		dispatch,
		redirectUrl,
		getState
    });
};

export const getOne = (id) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_BOOK',
		name: 'book',
		url: `/api/books/${id}`,
		dispatch,
		getState
    });
};

export const getOneBySlug = (slug) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_BOOK',
		name: 'book',
		url: `/api/books/filter/${slug}`,
		dispatch,
		getState
  });
};


export const post = (body) => (dispatch, getState) => {
	return apiPost({
		key: 'FETCH_BOOK',
		name: 'book',
		redirectUrl: '/dashboard/livre',
		params: true,
		url: `/api/books`,
		body,
		dispatch,
		getState
    });
};

export const edit = (id, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_BOOK',
		name: 'book',
		redirectUrl: `/dashboard/livre/${id}`,
		url: `/api/books/${id}`,
		body,
		dispatch,
		getState
    });
};

export const comment = (userId, bookId, body) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_BOOK',
		name: 'book',
		url: `/api/books/comment`,
		body: {userId, bookId, comment: {text: body}},	
		dispatch,
		getState
    });
};

export const uncomment = (userId, bookId, comment) => (dispatch, getState) => {
	return apiEdit({
		key: 'FETCH_BOOK',
		name: 'book',
		url: `/api/books/uncomment`,
		body: {userId, bookId, comment},	
		dispatch,
		getState
    });
};



export const remove = (id) => (dispatch, getState) => {

	return apiDelete({
		key: 'DELETE_BOOK',
		name: 'books',
		redirectUrl: '/dashboard/livres',
		url: `/api/books/${id}`,
		id: id,
		dispatch,
		getState
    });
};

export const getBooksByGenre = (id, publish, limit) => (dispatch, getState) => {
	let url = `/api/books/by/${id}`;
	if(publish) {
		url += `?publish=${publish}`;
	}
	if(limit) {
		url += `&limit=${limit}`;
	}

	return apiGet({
		key: 'FETCH_BOOKS',
		name: 'books',
		url: url,
		dispatch,
		getState
    });
};

export const getBooksByAuthor = (id) => (dispatch, getState) => {
	return apiGet({
		key: 'FETCH_BOOKS',
		name: 'books',
		url: `/api/books/from/${id}`,
		dispatch,
		getState
  });
};


export const initialize  = () => (dispatch, getState) => {
	return dispatch({type: FETCH_BOOK_REQUEST})
}



