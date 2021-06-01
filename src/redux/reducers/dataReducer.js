import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from '../types';

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
            return {...state};
        default:
            return state;
    }
}