import React, { Component } from "react";
import { Link } from "react-router-dom";

class IndividualCommunity extends Component {
  render() {
    return (
      <div>
        <div class='card' style={{ width: "20rem" }}>
          <div class='card-body'>
            <h4 class='card-title' style={{ color: "black" }}>
              {this.props.community.name}
            </h4>
            <p class='card-text'>{this.props.community.description}</p>
          </div>
          <div class='card-body'>
            <Link
              to={`/communities/${this.props.community._id}`}
              state={{ id: this.props.community._id }}
              style={{ color: "rgb(161, 131, 161)" }}
            >
              Enter {this.props.community.name}
            </Link>
            <br></br>
            <Link to='/users' style={{ color: "rgb(161, 131, 161)" }}>
              View Members
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default IndividualCommunity;
