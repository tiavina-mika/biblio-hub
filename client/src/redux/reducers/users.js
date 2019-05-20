import { combineReducers } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import {
	FETCH_USERS_SUCCESS,
	FETCH_USERS_REQUEST,
	FETCH_USERS_FAILURE,
	FETCH_USER_SUCCESS,
	FETCH_USER_REQUEST,
	FETCH_USER_FAILURE,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_REQUEST,
	FETCH_USER_PROFILE_FAILURE,
} from '../actions/constants';

const loading = (state = false, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return true;
		case FETCH_USERS_SUCCESS:
		case FETCH_USERS_FAILURE:
			return false;
		default:
			return state;
	}
};

const users = (state = ImmutableMap({ users: null }), action) => {
	switch (action.type) {

		case FETCH_USERS_REQUEST:
		    return state.clear()
		case FETCH_USERS_SUCCESS:
			return state
				.set('users', action.users)
		case FETCH_USERS_FAILURE:
			return state
				.set('users', null)
		default:
			return state
  }
}

const user = (state = ImmutableMap({ user: null }), action) => {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return state.clear();
		case FETCH_USER_SUCCESS:
			return state
				.set('user', action.user)
		case FETCH_USER_FAILURE:
			return state
				.set('user', null)
		default:
			return state
    }
}

const profile = (state = ImmutableMap({ profile: null }), action) => {
	switch (action.type) {
		case FETCH_USER_PROFILE_REQUEST:
			return state.clear();
		case FETCH_USER_PROFILE_SUCCESS:
			return state
				.set('profile', action.profile)
		case FETCH_USER_PROFILE_FAILURE:
			return state
				.set('profile', null)
		default:
			return state
    }
}

export default combineReducers({
  loading: loading,
  data: users,
  user: user,
  profile: profile,
});

export const getUser = state => state.user.get('user');
export const getUsers = state => state.data.get('users');
export const getUsersLoading = state => state.loading;