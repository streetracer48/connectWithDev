import axios from "axios";
import {
  GET_POSTS,
  POSTS_ERROR,
  POSTS_LOADING_START,
  UPDATE_LIKES
} from "./types";
import { setAlert } from "./alert";

export const startPostsLoading = () => dispatch => {
  dispatch({
    type: POSTS_LOADING_START
  });
};

export const getposts = () => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    dispatch(startPostsLoading());
    const res = await axios.get("/api/posts", config);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const postLike = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/posts/like/${id}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {}
};

export const unLikePost = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/posts/unlike/${id}`, config);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (error) {}
};
