import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { addLike, removeLike, deletePost } from "../../actions/post";
import PostItem from "./PostItem";
import axios from "axios";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const IndividualPost = ({
  addLike,
  removeLike,
  getPost,
  deletePost,
  auth,
  match,
  post: { post, loading },
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <h3>Loading</h3>
  ) : (
    <Fragment>
      <div class='card'>
        <PostItem post={post} showActions={true} />
        {auth.isAuthenticated && (
          <div>
            <CommentForm postID={post._id}></CommentForm>
          </div>
        )}
      </div>
    </Fragment>
  );
};

IndividualPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getPost,
})(IndividualPost);
