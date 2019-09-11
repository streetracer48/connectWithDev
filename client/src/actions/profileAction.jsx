import axios from "axios";
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  PROFILE_LOADING_START
} from "./types";

export const profileLoadingStart = () => async dispatch => {
  dispatch({
    type: PROFILE_LOADING_START
  });
};

export const currentUserProfile = () => async dispatch => {
  try {
    dispatch(profileLoadingStart());
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// create profile

export const createProfile = (
  profileData,
  history,
  isEdit = false
) => async dispatch => {
  try {
    dispatch(profileLoadingStart());
    const res = axios.post("api/profile", profileData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(
      setAlert(isEdit ? "Profile Updated" : "Profile Created", "success")
    );
    if (!isEdit) {
      return history.push("/dashboard");
    }
  } catch (error) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR
    });
  }
};
