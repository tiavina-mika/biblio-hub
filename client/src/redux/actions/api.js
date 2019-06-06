import axios from 'axios';
import { setError } from './error';
import { BASE_URL } from './constants';
import { dispatchLogout } from './authentication';
import { getStorage } from './../../utils/local-storage';
import { push, go } from 'connected-react-router';

export const setAuthHeader = token => {
	if (token) {
        axios.defaults.headers.common['Authorization'] = token;
	} else {
		axios.defaults.headers.common['Authorization'] = null;
	}
}

export const apiPost = async ({ key, name, url, body, params, redirectUrl, dispatch, getState, token, ...rest }) => {
    try {
        if (token) {
            setAuthHeader(getStorage('token'));
        }

        dispatch({ type: `${key}_REQUEST` });
        if (!(body instanceof FormData)) {
            axios.defaults.headers.post['Content-Type'] = 'application/json';
        } 
        if (body instanceof FormData) {
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        }

        const response = await axios.post(`${BASE_URL}${url}`, body);
        if (response && response.status !== 200) {
            return dispatch(setError(response.data));
        }

        const data = await response.data;

        dispatch({ type: `${key}_SUCCESS`, [name]: data, getState });
        return params ? dispatch(push(`${redirectUrl}/${data._id}`)) : dispatch(push(redirectUrl)) ;
    } catch(error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError('NETWORK_ERROR'));       
            } else if (error.response.data !== 'UNAUTHORIZED') {
                dispatch({ type: `${key}_FAILURE` });
                dispatch(setError('UNAUTHORIZED'));
                return dispatchLogout(dispatch, getState);
            } else {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError(error.response.data)); 
            };            
        }
        dispatch({ type: `${key}_FAILURE` });
        return dispatch(setError('NETWORK_ERROR'));
    };
};

export const apiEdit = async ({ key, name, url, body, redirectUrl, dispatch, getState, token, ...rest }) => {
    try {
        if (token) {
            setAuthHeader(getStorage('token'));
        }

        dispatch({ type: `${key}_REQUEST` });
        if (!(body instanceof FormData)) {
            axios.defaults.headers.post['Content-Type'] = 'application/json';
        } 
        if (body instanceof FormData) {
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        }

        const response = await axios.put(`${BASE_URL}${url}`, body);

        if (response && response.status !== 200) {
            return dispatch(setError(response.data));
        }

        const data = await response.data;
        dispatch({ type: `${key}_SUCCESS`, [name]: data, getState });
        return data && redirectUrl ? dispatch(push(redirectUrl)) : dispatch(go(0));
    } catch(error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError('NETWORK_ERROR'));       
            } else if (error.response.status === 401 && error.response.headers.get('WWW-Authenticate') === 'TokenExpired') {
                dispatch({ type: `${key}_FAILURE` });
                dispatch(setError('UNAUTHORIZED'));
                return dispatchLogout(dispatch, getState);
            }  else if (error.response.data !== 'UNAUTHORIZED' && error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatchLogout(dispatch, getState);
            } else {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError(error.response.data)); 
            };            
        }
        dispatch({ type: `${key}_FAILURE` });
        return dispatch(setError('NETWORK_ERROR'));
    };
};

export const apiGet = async ({ key, name, url, redirectUrl, dispatch, getState, token, ...rest }) => {
    try {
        if (token) {
            setAuthHeader(getStorage('token'));
        }
        
        dispatch({ type: `${key}_REQUEST` });
        const response = await axios.get(`${BASE_URL}${url}`);

        if (response.statusText !== 'OK' && (response.status === 404 || response.status === 400)) {
            dispatch({ type: `${key}_FAILURE` });
            return dispatch(setError('NETWORK_ERROR'));       
        } else if (response.statusText !== 'OK' && response.status === 401 && response.headers.get('WWW-Authenticate') === 'TokenExpired') {
            dispatch({ type: `${key}_FAILURE` });
            dispatch(setError('UNAUTHORIZED'));
            return dispatchLogout(dispatch, getState);
        }  else if (!response.statusText !== 'OK' && response.status === 401) {
            dispatch({ type: `${key}_FAILURE` });
            return dispatchLogout(dispatch, getState);
        } 
        
        const data = await response.data;
        dispatch({ type: `${key}_SUCCESS`, [name] : data, getState });
        if(redirectUrl){
            return dispatch(push(redirectUrl));
        }
        return data;
    } catch(error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError('NETWORK_ERROR'));       
            } else if (error.response.status === 401 && error.response.headers.get('WWW-Authenticate') === 'TokenExpired') {
                dispatch({ type: `${key}_FAILURE` });
                return dispatchLogout(dispatch, getState);
            }  else if (error.response.data !== 'UNAUTHORIZED' && error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                dispatch(setError('UNAUTHORIZED'));
                return dispatchLogout(dispatch, getState);
            } else {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError(error.response.data)); 
            };            
        }
        dispatch({ type: `${key}_FAILURE` });
        return dispatch(setError('NETWORK_ERROR'));
    };
};

export const apiDelete = async ({ key, name, url, redirectUrl, dispatch, getState, token, ...rest }) => {
    try {
        if (token) {
            setAuthHeader(getStorage('token'));
        }
        
        dispatch({ type: `${key}_REQUEST` });
        const response = await axios.delete(`${BASE_URL}${url}`);

        if (response.statusText !== 'OK' && (response.status === 404 || response.status === 400)) {
            dispatch({ type: `${key}_FAILURE` });
            return dispatch(setError('NETWORK_ERROR'));       
        } else if (response.statusText !== 'OK' && response.status === 401 && response.headers.get('WWW-Authenticate') === 'TokenExpired') {
            dispatch({ type: `${key}_FAILURE` });
            return dispatchLogout(dispatch, getState);
        }  else if (!response.statusText !== 'OK' && response.status === 401) {
            dispatch({ type: `${key}_FAILURE` });
            return dispatchLogout(dispatch, getState);
        } 
        
        const data = await response.data;
        dispatch({ type: `${key}_SUCCESS`, [name] : data, getState });
        return data ? dispatch(push(redirectUrl)) : dispatch(push('/'));
    } catch(error) {
        if (error.response) {
            if (error.response.status === 404 || error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError('NETWORK_ERROR'));       
            } else if (error.response.status === 401 && error.response.headers.get('WWW-Authenticate') === 'TokenExpired') {
                dispatch({ type: `${key}_FAILURE` });
                return dispatchLogout(dispatch, getState);
            }  else if (error.response.data !== 'UNAUTHORIZED' && error.response.status === 401) {
                dispatch({ type: `${key}_FAILURE` });
                return dispatchLogout(dispatch, getState);
            } else {
                dispatch({ type: `${key}_FAILURE` });
                return dispatch(setError(error.response.data)); 
            };            
        }
        dispatch({ type: `${key}_FAILURE` });
        return dispatch(setError('NETWORK_ERROR'));
    };
};
