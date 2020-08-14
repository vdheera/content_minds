import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import PostItem from "../layout/PostItem";

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
      <h1 className='large text-primary'>Profile</h1>
      <p className='lead'>Welcome {user && user.name}</p>
      {profile !== null ? (
        <Fragment>
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
      ) : (
        <Fragment>
          You haven't posted, liked or commented on any post.
          <Link to='/communities'>Go to a Community to Start!</Link>
        </Fragment>
      )}
    </Fragment>
  );
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
