import {
  USER_LOADED,
  ACCOUNT_DELETE,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS
} from "../actions/types";
import isEmpty from "../utils/isEmpty";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: payload
      };
    case ACCOUNT_DELETE:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("jwtToken", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    default:
      return state;
  }
}
