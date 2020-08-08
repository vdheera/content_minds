import React, { Component, Fragment } from "react";
import axios from "axios";
import IndividualPost from "./IndividualPost";

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const commid = await this.props.location.id;
    //console.log(typeof commid.id);
    const res = await axios.get(
      "http://localhost:5000/communities/" + `${commid}`
    );

    this.setState({ posts: res.data, loading: false });
  }
  render() {
    return (
      <Fragment>
        <button>Write a Post!</button>
        <div style={postStyle}>
          {this.state.posts.map((posts) => (
            <IndividualPost key={posts._id} post={posts} />
          ))}
        </div>
      </Fragment>
    );
  }
}

const postStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,0.1f)",
  gridGap: "1rem",
};

export default Posts;
