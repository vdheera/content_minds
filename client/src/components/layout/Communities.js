import React, { Component } from "react";
import axios from "axios";
import IndividualCommunity from "./IndividualCommunity";
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
      <div style={communityStyle}>
        {this.state.communities.map((communities) => (
          <IndividualCommunity key={communities._id} community={communities} />
        ))}
      </div>
    );
  }
}

const communityStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,0.1f)",
  gridGap: "1rem",
};

export default Communities;
