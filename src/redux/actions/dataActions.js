import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from '../types';
import axios from 'axios';

//Get all posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA});
    axios.get('/posts')
    .then(response => {
        dispatch({ type: SET_POSTS, payload: response.data })
    })
    .catch(error => {
        dispatch({ type: SET_POSTS, payload: {}});
        console.error(error);
    })
}

//Like a post
export const likePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/like`)
    .then(response => {
        dispatch({ type: LIKE_POST, payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
}


//Unlike a post
export const unlikePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/unlike`)
    .then(response => {
        dispatch({ type: UNLIKE_POST, payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
}