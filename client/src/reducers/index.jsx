import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postsReducer from "./postsReducer";
import alert from "./alert";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  alert,
  profile: profileReducer,
  post: postsReducer
});
