import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { getPostUser } from "../../actions/post";
import axios from "axios";
import CommentItem from "./CommentItem";
import IndividualPost from "./IndividualPost";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, topic, body, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div>
      {showActions && (
        <div>
          <Fragment>
            <div style={{ width: "40rem" }}>
              {auth.isAuthenticated && !auth.loading && (
                <Link
                  to={`/users/${user._id}`}
                  class='card-header'
                  key={user._id}
                >
                  {user.name}
                </Link>
              )}
              <div class='card-body'>
                <h4 class='card-title' style={{ color: "black" }}>
                  {topic}
                </h4>
                <p className='post-date' class='card-subtitle'>
                  Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                <p class='card-text'>{body}</p>
              </div>
              {auth.isAuthenticated && !auth.loading && (
                <div class='card-body'>
                  {user._id !== auth.user._id && (
                    <button
                      class='card-link'
                      onClick={(e) => addLike(_id)}
                      type='button'
                      className='btn btn-light'
                    >
                      <i className='fas fa-thumbs-up' />{" "}
                      <span>
                        {likes.length > 0 && <span>{likes.length}</span>}
                      </span>
                    </button>
                  )}
                  {user._id !== auth.user._id && (
                    <button
                      class='card-link'
                      onClick={(e) => removeLike(_id)}
                      type='button'
                      className='btn btn-light'
                    >
                      <i className='fas fa-thumbs-down' />
                    </button>
                  )}
                  {user._id === auth.user._id && (
                    <button
                      onClick={(e) => deletePost(_id)}
                      type='button'
                      className='btn btn-danger'
                    >
                      <i className='fas fa-times' />
                    </button>
                  )}
                </div>
              )}
              {comments.length > 0 && (
                <div class='card-footer'>
                  <h7 style={{ color: "black" }}>Comments</h7>
                  {comments.map((comment) => (
                    <li class='list-group-item'>
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        postID={_id}
                      />
                    </li>
                  ))}
                </div>
              )}
              <br></br>
            </div>
          </Fragment>
        </div>
      )}
      {!showActions && (
        <div>
          <Fragment>
            <div style={{ width: "20rem" }}>
              {auth.isAuthenticated && !auth.loading && (
                <Link
                  to={`/users/${user._id}`}
                  class='card-header'
                  key={user._id}
                >
                  {user.name}
                </Link>
              )}
              <div class='card-body'>
                <h4 class='card-title' style={{ color: "black" }}>
                  {topic}
                </h4>

                <p className='post-date' class='card-subtitle'>
                  Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                <p class='card-text'>{body}</p>
              </div>
              {auth.isAuthenticated && !auth.loading && (
                <div class='card-body'>
                  {user._id !== auth.user._id && (
                    <button
                      class='card-link'
                      onClick={(e) => addLike(_id)}
                      type='button'
                      className='btn btn-light'
                    >
                      <i className='fas fa-thumbs-up' />{" "}
                      <span>
                        {likes.length > 0 && <span>{likes.length}</span>}
                      </span>
                    </button>
                  )}
                  {user._id !== auth.user._id && (
                    <button
                      class='card-link'
                      onClick={(e) => removeLike(_id)}
                      type='button'
                      className='btn btn-light'
                    >
                      <i className='fas fa-thumbs-down' />
                    </button>
                  )}
                  {user._id === auth.user._id && (
                    <button
                      onClick={(e) => deletePost(_id)}
                      type='button'
                      className='btn btn-danger'
                    >
                      <i className='fas fa-times' />
                    </button>
                  )}
                </div>
              )}
              {comments.length > 0 && (
                <Link
                  class='card-link'
                  to={`/post/${_id}`}
                  style={{ color: "black" }}
                >
                  View all Comments
                </Link>
              )}
              <br></br>
            </div>
          </Fragment>
        </div>
      )}
    </div>
  );
};

PostItem.defaultProps = {
  showActions: false,
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
