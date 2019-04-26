import axios from 'axios';
import { push } from 'connected-react-router';
import { FETCH_USER_SUCCESS, FETCH_USER_REQUEST, BASE_URL } from './constants';
import { setStorage, resetStorage } from '../../utils/local-storage';
import { setError } from './error';
import { getLocation } from '../../redux/root-reducer';

const url = '/auth';

export const signin =  (email, password) => async (dispatch, getState) => {
    try {
        const location = getLocation(getState());
        dispatch({ type: FETCH_USER_REQUEST });

        const curentUser = await axios.post(`${BASE_URL}${url}/signin`, { email, password});
        const { token, success, isAdmin, user } = curentUser.data;
        setAuthHeader(token)

        setStorage({ authenticated: success, id: user.id, email: user.email, token: token });

        dispatch({ type: FETCH_USER_SUCCESS, id: user.id, email: user.email, isAdmin: isAdmin });
        if (location && location.query && location.query.redirect) {
            return dispatch(push(location.query.redirect))
        }
        return isAdmin ? dispatch(push('/dashboard')) : dispatch(push('/'));

    } catch (e) {
        // dispatch(setError('NetworkError'));
        dispatch(setError(e.response.data));
        // console.log('error :', e.response.data);
    }
}

export const signup = (name, email, password) => async dispatch => {
    try {
        const user = await axios.post(`${BASE_URL}${url}/signup`, {name, email, password});
        // const isAdmin = user.data.role ==='ADMIN';
        if (user) {
            dispatch(push(`/signin`));
        }
	} catch(error) {
        dispatch(setError('NetworkError'))
    }
}

export const logout = () => (dispatch, getState) => {
	return dispatchLogout(dispatch, getState);
};

export const dispatchLogout = (dispatch, getState, path = '/signin') => {
	const location = getLocation(getState());
	resetStorage();

	if (location.pathname !== '/logout' && path === '/signin') {
		return dispatch(push(`${path}?redirect=${encodeURIComponent(location.pathname + location.search)}`));
	} else if (location.pathname !== '/logout') {
		return dispatch(push(path));
	}
	return dispatch(push(path));
}

const setAuthHeader = token => {
	if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	} else {
		axios.defaults.headers.common['Authorization'] = null
	}
}
