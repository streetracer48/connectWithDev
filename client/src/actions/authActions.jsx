import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// load user

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users/current");
    console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const registerUser = userData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/users/register", userData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login user

// export const loginUser = userData => async dispatch => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };
//   try {
//     const res = await axios.post("/api/users/login", userData, config);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });
//     dispatch(loadUser());
//   } catch (error) {
//     const errors = error.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };

export const loginUser = (userData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", userData, config);
    console.log(res);
    // Save to localStorage
    const { token } = res.data;
    // Set token to ls
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: USER_LOADED,
    payload: decoded
  };
};
