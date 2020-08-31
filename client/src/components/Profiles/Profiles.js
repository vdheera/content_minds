import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner.gif";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <h1 style={h3Style}>Loading</h1>
      ) : (
        <Fragment>
          <h1 style={titleStyle}>Community Members</h1>
          <p className='lead'></p>
          <div class='card-columns'>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h3 style={h3Style}>no members found</h3>
              )}
            </div>
          </div>
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
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
