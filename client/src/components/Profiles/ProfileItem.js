import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({ profile: { _id, name, email } }) => {
  return (
    <div className='profile bg-light'>
      <h2>{name}</h2>
      <h3>Email Address: {email}</h3>
      <Link to={`/users/${_id}`}>View Profile</Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
