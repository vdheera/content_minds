import React, { Component } from "react";
import { Link } from "react-router-dom";

class IndividualPost extends Component {
  render() {
    return (
      <div>
        <Link to='/login' className='profile-top bg-primary p-2'>
          <h1 className='large'>{this.props.post.topic}</h1>
          <p className='lead'>{this.props.post.body}</p>
          <Link to='/register' style={{ color: "black" }}>
            {this.props.post.comments.map((comment) => (
              <p key={comment._id}>{comment.text}</p>
            ))}
          </Link>
          <div>
            <p>{this.props.post.likes.length}</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default IndividualPost;
