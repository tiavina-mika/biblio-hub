import { combineReducers } from 'redux';
import { Map as ImmutableMap } from 'immutable';
import {
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_REQUEST,
	FETCH_USER_PROFILE_FAILURE,
} from '../actions/constants';

// const loading = (state = false, action) => {
// 	switch (action.type) {
// 		case FETCH_USERS_REQUEST:
// 			return true;
// 		case FETCH_USERS_SUCCESS:
// 		case FETCH_USERS_FAILURE:
// 			return false;
// 		default:
// 			return state;
// 	}
// };

const profile = (state = ImmutableMap({ profile: null }), action) => {
	switch (action.type) {
		case FETCH_USER_PROFILE_REQUEST:
			return state.clear();
		case FETCH_USER_PROFILE_SUCCESS:
			return state
				.set('profile', action.profile);
		case FETCH_USER_PROFILE_FAILURE:
			return state
				.set('profile', null);
		default:
			return state;
    }
}

export default combineReducers({
//   loading: loading,
  profile: profile,
});  