import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postID, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <form
        class='card-body'
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postID, { text });
          setText("");
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='2'
          placeholder='Comment on this post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
