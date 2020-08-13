import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

//GET posts

export const getPosts = (communityID) => async (dispatch) => {
  try {
    const res = await axios.get(`/communities/${communityID}`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add like
export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/like/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Remove like
export const removeLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/posts/unlike/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
