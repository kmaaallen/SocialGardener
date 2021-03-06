import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST, CREATE_POST, SET_POST, CREATE_COMMENT } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export const dataReducer = function(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {...state, loading:true};
        case SET_POSTS:
            return {...state, loading: false, posts: action.payload};
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            if(state.post.postId === action.payload.postId){
                state.post = action.payload;
            }
            return {...state};
        case DELETE_POST:
            let postIndex = state.posts.findIndex((post) => post.postId === action.payload);
            state.posts.splice(postIndex,1);
            return {...state};
        case CREATE_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case SET_POST:
            return {...state, loading: false, post: action.payload};
        case CREATE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                }
            }
        default:
            return state;
    }
}