import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IndividualCommunity from "./IndividualCommunity";
import Profiles from "../Profiles/Profiles";
class Communities extends Component {
  state = {
    communities: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get("http://localhost:5000/communities");

    this.setState({ communities: res.data, loading: false });
  }
  render() {
    return (
      <Fragment>
        <div class='card-columns'>
          <div style={communityStyle}>
            {this.state.communities.map((communities) => (
              <IndividualCommunity
                key={communities._id}
                community={communities}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const communityStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,0.1f)",
  gridGap: "1rem",
};

export default Communities;
