import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import PostItem from "../layout/PostItem";
import CommentForm from "../layout/CommentForm";

const MyProfile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 style={titleStyle}>Welcome {user && user.name}</h1>
      {profile !== null ? (
        <Fragment>
          <h2 style={h3Style}>Posts you've commented on</h2>
          <div class='card-columns'>
            {profile.comments.map((posts) => (
              <div class='card' style={{ width: "20rem" }}>
                <PostItem key={posts._id} post={posts} />
                <CommentForm postID={posts._id}></CommentForm>
              </div>
            ))}
          </div>
          <h2 style={h3Style}>Posts you've liked</h2>
          <div class='card-columns'>
            {profile.liked.map((posts) => (
              <div class='card' style={{ width: "20rem" }}>
                <PostItem key={posts._id} post={posts} />
                <CommentForm postID={posts._id}></CommentForm>
              </div>
            ))}
          </div>
          <h2 style={h3Style}>Posts you've made</h2>
          <div class='card-columns'>
            {profile.posts.map((posts) => (
              <div class='card' style={{ width: "20rem" }}>
                <PostItem key={posts._id} post={posts} />
                <CommentForm postID={posts._id}></CommentForm>
              </div>
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          You haven't posted, liked or commented on any post.
          <Link to='/communities'>Go to a Community to Start!</Link>
        </Fragment>
      )}
    </Fragment>
  );
};
const titleStyle = {
  color: "white",
  textAlign: "center",
};
const h3Style = {
  color: "black",
  textAlign: "center",
};
MyProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(MyProfile);
