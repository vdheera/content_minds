import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, topic, body, user, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/posts/${_id}`}>
            <h4>{topic}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{body}</p>
          <div>
            {comments.map((comment) => (
              <p key={comment._id}>{comment.text}</p>
            ))}
          </div>
          <p class='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
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
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times' />
          </button>
        )}
      </div>

      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form class='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            required
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
