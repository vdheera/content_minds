import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
} from "./types";
import Posts from "../components/layout/Posts";

//Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  //dispatch(CLEAR_PROFILE);
  try {
    const res = await axios.get("/users");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileByID = (userId) => async (dispatch) => {
  //dispatch(CLEAR_PROFILE);
  try {
    const res = await axios.get(`/users/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
