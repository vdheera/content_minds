import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { getPostUser } from "../../actions/post";

const IndividualPost = ({
  getPost,
  getPostUser,
  post: { post, loading },
  match,
  auth,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return <div>post</div>;
};

IndividualPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.post,
});

export default connect(mapStateToProps, { getPost, getPostUser })(
  IndividualPost
);
