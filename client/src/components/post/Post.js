import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/post";
import { Link } from "react-router-dom";
import IndividualPost from "../layout/IndividualPost";
import PostItem from "../layout/PostItem";

const Post = ({ getPosts, post: { posts, loading }, match }) => {
  useEffect(() => {
    getPosts(match.params.id);
  }, [getPosts]);
  return (
    <Fragment>
      <Link to='/makepost'>Write a Post!</Link>
      <div>
        {posts.map((posts) => (
          <PostItem key={posts._id} post={posts} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Post);
