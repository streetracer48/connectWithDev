import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING_START
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
      return {
        ...state,
        profile: payload,
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
