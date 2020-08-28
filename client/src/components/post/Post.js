import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import IndividualPost from "../layout/IndividualPost";
import PostItem from "../layout/PostItem";
import PostForm from "../layout/PostForm";
import CommentForm from "../layout/CommentForm";
import CommentItem from "../layout/CommentItem";
import { post } from "request";
import GridLayout from "react-grid-layout";

const Post = ({
  isAuthenticated,
  getPosts,
  auth,
  post: { posts, loading },
  match,
}) => {
  useEffect(() => {
    getPosts(match.params.id);
  }, [getPosts]);
  return (
    <Fragment>
      {isAuthenticated && <PostForm></PostForm>}
      {isAuthenticated && (
        <Fragment>
          <h3 style={titleStyle}>Previous Posts</h3>
          <br></br>
        </Fragment>
      )}

      {!isAuthenticated && (
        <Fragment>
          <h3 style={titleStyle}>Posts</h3>
          <br></br>
        </Fragment>
      )}
      <div class='card-columns'>
        {posts.map((posts) => (
          <div class='card' style={cardStyle}>
            <PostItem key={posts._id} post={posts}></PostItem>
            {isAuthenticated && (
              <div>
                <CommentForm postID={posts._id}></CommentForm>
              </div>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const titleStyle = {
  color: "black",
  textAlign: "center",
};

const cardStyle = {
  width: "20rem",
  borderColor: "black",
  borderWidth: "2px",
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts })(Post);
