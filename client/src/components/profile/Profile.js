import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByID } from "../../actions/profile";
import PostItem from "../layout/PostItem";
import Post from "../post/Post";
import CommentForm from "../layout/CommentForm";

const Profile = ({
  getProfileByID,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <h1>Loading</h1>
      ) : (
        <Fragment>
          <h1 style={titleStyle}>{profile.user.name}</h1>
          <h4 style={h3Style}>{profile.user.email}</h4>
          {auth.isAuthenticated && !auth.loading && (
            <div>
              <h2 style={h3Style}>
                Posts {profile.user.name} has commented on
              </h2>
              <div class='card-columns'>
                {profile.comments.map((posts) => (
                  <div class='card' style={{ width: "20rem" }}>
                    <PostItem key={posts._id} post={posts} />
                    <CommentForm postID={posts._id}></CommentForm>
                  </div>
                ))}
              </div>
              <h2 style={h3Style}>Posts {profile.user.name} has liked</h2>
              <div class='card-columns'>
                {profile.liked.map((posts) => (
                  <div class='card' style={{ width: "20rem" }}>
                    <PostItem key={posts._id} post={posts} />
                    <CommentForm postID={posts._id}></CommentForm>
                  </div>
                ))}
              </div>
              <h2 style={h3Style}>Posts {profile.user.name} has made</h2>
              <div class='card-columns'>
                {profile.posts.map((posts) => (
                  <div class='card' style={{ width: "20rem" }}>
                    <PostItem key={posts._id} post={posts} />
                    <CommentForm postID={posts._id}></CommentForm>
                  </div>
                ))}
              </div>
            </div>
          )}
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

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
