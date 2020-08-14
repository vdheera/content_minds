import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  GET_POST_USER,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

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

export const deletePost = (postID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/posts/${postID}`);
    dispatch({
      type: DELETE_POST,
      payload: { postID },
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/posts/5f2c951f81383f0558b91102`,
      formData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`/posts/${postID}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostUser = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/${userID}`);
    dispatch({
      type: GET_POST_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postID, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/posts/comment/${postID}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/posts/comment/${postID}/${commentID}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        /*msg: err.response.statusText, status: err.response.status,*/
      },
    });
  }
};
