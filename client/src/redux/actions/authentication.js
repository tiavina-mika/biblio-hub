import axios from 'axios';
import { push } from 'connected-react-router';
import { FETCH_AUTH_SUCCESS, FETCH_AUTH_REQUEST, FETCH_AUTH_FAILURE, BASE_URL } from './constants';
import { setStorage, resetStorage } from '../../utils/local-storage';
import { setError } from './error';
import { getLocation } from '../../redux/root-reducer';
import { setAuthHeader } from './api';

const url = '/auth';

export const signin =  (email, password) => async (dispatch, getState) => {
    try {
        const location = getLocation(getState());
        dispatch({ type: FETCH_AUTH_REQUEST });

        const curentUser = await axios.post(`${BASE_URL}${url}/signin`, { email, password});

        const { token, success, isAdmin, user } = curentUser.data;
        setAuthHeader(token)

        setStorage({ authenticated: success, id: user.id, email: user.email, token, isAdmin });

        dispatch({ type: FETCH_AUTH_SUCCESS, id: user.id, email: user.email, isAdmin: isAdmin });
        if (location && location.query && location.query.redirect) {
            return dispatch(push(location.query.redirect))
        }
        return isAdmin ? dispatch(push('/dashboard')) : dispatch(push('/'));

    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: FETCH_AUTH_FAILURE });
                return dispatch(setError('NETWORK_ERROR'));       
            } else if (error.response.status === 401 && error.response.headers.get('WWW-Authenticate') === 'TokenExpired') {
                dispatch({ type: FETCH_AUTH_FAILURE });
                return dispatchLogout(dispatch, getState);
            } else {
                dispatch({ type: FETCH_AUTH_FAILURE });
                return dispatch(setError(error.response.data)); 
            };            
        }
        return dispatch(setError(error.response.data));
    }
}

export const signup = (name, email, password) => async dispatch => {
    try {
        const user = await axios.post(`${BASE_URL}${url}/signup`, {name, email, password});
        // const isAdmin = user.data.role ==='ADMIN';
        if (user && user.status !== 200) {
            return dispatch(setError(user.data));
        }
        
        return dispatch(push(`/signin`));
	} catch(error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: FETCH_AUTH_FAILURE });
                return dispatch(setError('NETWORK_ERROR'));       
            }
            dispatch({ type: FETCH_AUTH_FAILURE });
            return dispatch(setError(error.response.data)); 
        }
        return dispatch(setError(error.response.data));
    }
}

export const logout = () => (dispatch, getState) => {
	return dispatchLogout(dispatch, getState);
};

export const dispatchLogout = (dispatch, getState, path = '/') => {
	const location = getLocation(getState());
	resetStorage();

    dispatch({ type: FETCH_AUTH_FAILURE });
	if (location.pathname !== '/logout' && path === '/signin') {
		return dispatch(push(`${path}?redirect=${encodeURIComponent(location.pathname + location.search)}`));
	} else if (location.pathname !== '/logout') {
		return dispatch(push(path));
	}
	return dispatch(push(path));
}
