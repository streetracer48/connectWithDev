import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED } from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
    case REGISTER_FAIL:
      return {};
    default:
      return state;
  }
}
