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
      {isAuthenticated && (
        //<Link to={`/posts/${match.params.id}`}>Write a Post!</Link>
        <PostForm></PostForm>

        /*<Link
          to={{
            pathname: `/posts/${match.params.id}`,
            state: { id: match.params.id },
          }}
        >
          Write a Post!
        </Link>*/
      )}

      {posts.map((posts) => (
        <div>
          <PostItem key={posts._id} post={posts}></PostItem>
          {isAuthenticated && (
            <div>
              <CommentForm postID={posts._id}></CommentForm>
            </div>
          )}
        </div>
      ))}
    </Fragment>
  );
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
