import { FETCH_BOOK_REQUEST } from './constants';

import { apiGet, apiDelete, apiPost, apiEdit } from './api';

export const getAll = (limit, page, publish, member, search, sort, redirectUrl) => (dispatch, getState) => {
	let url = `/api/books`;
	
	if(limit) {
		url += `?limit=${limit}`;
	}
	if (page) {
		url += `&page=${page}`;
	}
	if(typeof(publish) === 'boolean') {
		url += `&publish=${publish}`;
	}
	if(typeof(member) === 'boolean') {
		url += `&member=${member}`;
	}
	if (search) {
		url += `&search=${search}`;
	}
	if (sort) {
		url += `&sort=${sort}`;
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
		token: true,
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
		token: true,
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
		token: true,
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
		token: true,
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
		token: true,
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