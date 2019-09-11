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
