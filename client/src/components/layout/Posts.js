import React, { Component } from "react";
import axios from "axios";
import IndividualPost from "./IndividualPost";
class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      "http://localhost:5000/communities/5f2c951f81383f0558b91102"
    );

    this.setState({ posts: res.data, loading: false });
  }
  render() {
    return (
      <div style={postStyle}>
        {this.state.posts.map((posts) => (
          <IndividualPost key={posts._id} post={posts} />
        ))}
      </div>
    );
  }
}

const postStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,0.1f)",
  gridGap: "1rem",
};

export default Posts;
