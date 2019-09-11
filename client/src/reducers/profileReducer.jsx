import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  PROFILE_LOADING_START
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: false,
  errors: {}
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
        loading: false,
        profile: payload
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        profiles: []
      };

    default:
      return state;
  }
}
