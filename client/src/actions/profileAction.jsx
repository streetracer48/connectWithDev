import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING_START,
  UPDATE_PROFILE
} from "./types";
import { setAlert } from "./alert";

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
      type: PROFILE_ERROR,
      payload: {}
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
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    dispatch(profileLoadingStart());
    const res = await axios.post("/api/profile", profileData, config);
    console.log(res);
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
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperience = (data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/experience", data, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Updated Profile", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add education profile updated

export const addEducation = (data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", data, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Updated profile by education", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete edu by id

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert("Successfully deleted experience", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
