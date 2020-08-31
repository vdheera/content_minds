import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postID,
  comment: { _id, text, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <Fragment>
      <h6 style={{ color: "black" }}>{text}</h6>
      <h7 class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </h7>
      {auth.isAuthenticated && !auth.loading && (
        <Link to={`/users/${user._id}`}>
          <p class='card-text' style={{ color: "black" }}>
            {user.name}
          </p>
        </Link>
      )}

      {auth.isAuthenticated && !auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postID, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </Fragment>
  );
};

CommentItem.propTypes = {
  postID: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
