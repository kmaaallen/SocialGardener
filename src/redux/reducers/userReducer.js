import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

export const userReducer =  function(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            return {
                ...state,
                likes: [...state.likes, {
                    userName: state.credentials.userName,
                    postId: action.payload.postId
                }]
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter((like) => like.postId !== action.payload.postId)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => notification.read = true);
            return {
                ...state
            }
        default:
            return state;

    }
}