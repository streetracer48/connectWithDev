import {
  GET_POSTS,
  POSTS_ERROR,
  POSTS_LOADING_START,
  UPDATE_LIKES,
  DELETE_POST
} from "../actions/types";

const initialState = {
  post: null,
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case POSTS_LOADING_START:
      return {
        ...state,
        post: null,
        posts: null,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POSTS_ERROR:
      return {
        ...state,
        profile: null,
        profiles: null,
        loading: false
      };

    default:
      return state;
  }
}
