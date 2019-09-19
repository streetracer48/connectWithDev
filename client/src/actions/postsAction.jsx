import axios from "axios";
import {
  GET_POSTS,
  POSTS_ERROR,
  POSTS_LOADING_START,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  GET_POST,
  DELETE_COMMENT
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

export const deletePost = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = axios.delete(`/api/posts/${id}`, config);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    dispatch(setAlert("Your post successfully deleted", "success"));
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

export const addPost = fromData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(fromData);

    const res = await axios.post("/api/posts", fromData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (err) {}
};

export const addComment = (postId, fromData) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      fromData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (error) {}
};

export const getPostById = id => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    dispatch(startPostsLoading());
    const res = await axios.get(`/api/posts/${id}`, config);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (error) {}
};

export const commentDelete = (postId, commentId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`,
      config
    );

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
  } catch (error) {}
};
