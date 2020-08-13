import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByID } from "../../actions/profile";
import IndividualPost from "../layout/IndividualPost";
import PostItem from "../layout/PostItem";

const Profile = ({
  getProfileByID,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <h1>Loading</h1>
      ) : (
        <Fragment>
          <h1>{profile.user.name}</h1>
          <h3>{profile.user.email}</h3>
          <h1>Posts {profile.user.name} has commented on</h1>
          <div>
            {profile.comments.map((posts) => (
              <PostItem key={posts._id} post={posts} />
            ))}
          </div>
          <h1>Posts {profile.user.name} has liked</h1>
          <div>
            {profile.liked.map((posts) => (
              <PostItem key={posts._id} post={posts} />
            ))}
          </div>
          <h1>Posts {profile.user.name} has made</h1>
          <div>
            {profile.posts.map((posts) => (
              <PostItem key={posts._id} post={posts} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
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
