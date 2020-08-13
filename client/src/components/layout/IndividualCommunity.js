import React, { Component } from "react";
import { Link } from "react-router-dom";

class IndividualCommunity extends Component {
  render() {
    return (
      <div>
        <div className='profile-top bg-primary p-2'>
          <Link to='/users' style={{ color: "black" }}>
            View Community Members
          </Link>
          <h1 className='large'>{this.props.community.name}</h1>
          <p className='lead'>{this.props.community.description}</p>
          <Link
            style={{ color: "black" }}
            to={`/communities/${this.props.community._id}`}
          >
            Enter {this.props.community.name}
          </Link>
        </div>
      </div>
    );
  }
}

export default IndividualCommunity;
