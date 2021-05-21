import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then((response) => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED});
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then((response) => {
            setAuthorizationHeader(response.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(response => {
            dispatch({ type: SET_USER, payload: response.data })
        })
        .catch(error => {
            console.error(error);
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}