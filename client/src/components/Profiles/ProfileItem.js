import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({ profile: { _id, name, email } }) => {
  return (
    <div className='profile bg-light' class='card' style={{ width: "15rem" }}>
      <div class='card-body'>
        <h4 class='card-title' style={{ color: "black" }}>
          {name}
        </h4>
        <p class='card-subtitle'>Email Address: {email}</p>
        <Link
          class='card-link'
          to={`/users/${_id}`}
          style={{ color: "rgb(161, 131, 161)" }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
