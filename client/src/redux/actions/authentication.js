import axios from 'axios';
import { push, go } from 'connected-react-router';
import { FETCH_AUTH_SUCCESS, FETCH_AUTH_REQUEST, FETCH_AUTH_FAILURE, BASE_URL } from './constants';
import { setStorage, resetStorage } from '../../utils/local-storage';
import { setError } from './error';
import { getLocation } from '../../redux/root-reducer';
import { setAuthHeader } from './api';
import { notify } from 'react-notify-toast';

const url = '/auth';
const messages = {
	'MAIL_CONFIRMATION_SEND_SUCCESS':  'Un email de confirmation vous a été envoyé pour terminer votre inscription.' ,
    'MAIL_CONFIRMATION_SEND_ERROR':  "Votre compte n'a pas pu être crée. Veuillez contacter l'administrateur." ,
    'USER_NOT_CONFIRMED': "Votre compte n'a pas encore été confirmé. Veuillez verifier l'email de confirmation."	
};
export const signin =  (email, password, refresh) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_AUTH_REQUEST });

        const currentUser = await axios.post(`${BASE_URL}${url}/signin`, { email, password});
        const { token, success, isAdmin, user } = currentUser.data;

        if(user.confirmed) {
            setAuthHeader(token)
    
            setStorage({ authenticated: success, id: user.id, email: user.email, token, isAdmin });
    
            dispatch({ type: FETCH_AUTH_SUCCESS, id: user.id, email: user.email, isAdmin: isAdmin });
            if(isAdmin) {
                return refresh? dispatch(go(refresh)) : dispatch(push('/dashboard'));
            } else {
                return refresh? dispatch(go(refresh)) : dispatch(push('/'));
            }
        } else {
            dispatch({ type: FETCH_AUTH_FAILURE });
            dispatchLogout(dispatch, getState);
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: FETCH_AUTH_FAILURE });
                return dispatch(setError('USER_NOT_FOUND'));       
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

export const signup = (name, email, password, redirect) => async (dispatch, getState) => {
    try {
        const user = await axios.post(`${BASE_URL}${url}/signup`, {name, email, password});
        if (user && user.status !== 200) {
            return dispatch(setError(user.data));
        }      
        redirect && dispatch(push(`/`));
        notify.show(messages[Object.keys(user.data)], 'success', 6000);

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