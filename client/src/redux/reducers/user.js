import { Map as ImmutableMap } from 'immutable';
import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/constants';

const user = (state = ImmutableMap({ authenticated: false, isAdmin: false, email: '', id: '' }), action) => {
	switch (action.type) {
		case FETCH_USER_SUCCESS:
			return state
				.set('authenticated', true)
				.set('email', action.email)
				.set('id', action.id)
				.set('isAdmin', action.isAdmin ? true : false);
		case FETCH_USER_FAILURE:
		return state
			.set('authenticated', false)
			.set('email', '')
			.set('id', '');
		default:
			return state;
	}
};

export default user;

export const getAuthenticated = state => state.get('authenticated');
export const getUserEmail = state => state.get('email');
export const getUserId = state => state.get('id');
export const getIsAdmin = state => state.get('isAdmin');