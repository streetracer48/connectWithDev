import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING_START,
  UPDATE_PROFILE,
  GET_PROFILES,
  ADD_POST
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_LOADING_START:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    default:
      return state;
  }
}
