import React, { Component } from "react";

class IndividualPost extends Component {
  render() {
    return (
      <div>
        <div className='profile-top bg-primary p-2'>
          <h1 className='large'>{this.props.post.topic}</h1>
          <p className='lead'>{this.props.post.body}</p>
        </div>
        <div className='profile-about bg-light p-2'></div>
      </div>
    );
  }
}

export default IndividualPost;
