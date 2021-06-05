import {
    SET_POSTS,
    LOADING_DATA,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    CREATE_POST,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_POST,
    STOP_LOADING_UI,
    CREATE_COMMENT
} from '../types';
import axios from 'axios';

//Get all posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/posts')
        .then(response => {
            dispatch({ type: SET_POSTS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: SET_POSTS, payload: {} });
            console.error(error);
        })
}

//Like a post
export const likePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/like`)
        .then(response => {
            dispatch({ type: LIKE_POST, payload: response.data })
        })
        .catch(error => {
            console.log(error);
        })
}


//Unlike a post
export const unlikePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/unlike`)
        .then(response => {
            dispatch({ type: UNLIKE_POST, payload: response.data })
        })
        .catch(error => {
            console.log(error);
        })
}

//submit a comment
export const createComment = (postId, commentData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post(`/post/${postId}/comment`, commentData)
    .then((response) => {
        dispatch({ type: CREATE_COMMENT, payload: response.data });
        dispatch(clearErrors());
    })
    .catch(error => {
        dispatch({ type: SET_ERRORS, payload: error.response.data })
        console.error(error);
    })
}

//delete a post
export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
        .then(() => {
            dispatch({ type: DELETE_POST, payload: postId })
        })
        .catch(error => {
            console.error(error);
        })
}

//create a post
export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost)
        .then((response) => {
            dispatch({ type: CREATE_POST, payload: response.data });
            dispatch(clearErrors());
        })
        .catch((error) => {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
            console.error(error);
        })
}

export const getPost = (postId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/post/${postId}`)
        .then(response => {
            dispatch({ type: SET_POST, payload: response.data });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(error => {
            console.error(error);
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
