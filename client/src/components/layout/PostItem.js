import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { getPostUser } from "../../actions/post";
import axios from "axios";
import CommentItem from "./CommentItem";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  getPostUser,
  auth,
  post: { _id, topic, body, user, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div className='post bg-white p-1 my-1'>
        {auth.isAuthenticated && !auth.loading && (
          <div>
            <div>
              <h4>{user}</h4>
            </div>
          </div>
        )}
        <div>
          <Link to={`/posts/${_id}`}>
            <h4>{topic}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{body}</p>
          <div></div>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>

          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postID={_id} />
          ))}

          <button
            onClick={(e) => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
        </div>
        {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPostUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getPostUser,
})(PostItem);
