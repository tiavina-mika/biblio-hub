import { ERROR_SET, ERROR_REMOVE } from './constants'

export const removeError = () => ({ type: ERROR_REMOVE });

export const setError = error => ({ type: ERROR_SET, error });