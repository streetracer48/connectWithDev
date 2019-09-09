import axios from "axios";
import { TEST_REDUX } from "./types";

export const registerUser = userData => {
  return {
    type: TEST_REDUX,
    payload: userData
  };
};
