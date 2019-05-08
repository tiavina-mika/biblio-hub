import { ERROR_REMOVE, FETCH_USER_REQUEST,  ERROR_SET } from '../actions/constants';


const error = (state = null, action) => {
	switch (action.type) {
		case ERROR_REMOVE:
		case FETCH_USER_REQUEST:
			return null;
		case ERROR_SET:
			return action.error;
		default:
			return state;
	}
};

export default error;