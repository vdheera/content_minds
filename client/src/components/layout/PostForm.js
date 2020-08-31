import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { Link, Redirect } from "react-router-dom";

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    topic: "",
    body: "",
  });

  const { topic, body } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(match.params);
    addPost({ topic, body });
  };
  return (
    <div className='post-form'>
      <div clas='bg-primary p'>
        <h3 style={{ color: "white" }}>Say Something!</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          name='topic'
          cols='30'
          rows='1'
          placeholder='Enter Topic'
          value={topic}
          onChange={onChange}
          required
        ></textarea>
        <textarea
          name='body'
          cols='30'
          rows='5'
          placeholder='Enter body'
          value={body}
          onChange={onChange}
          required
        ></textarea>
        <input
          type='submit'
          className='btn btn-dark my-1'
          value='Post!'
        ></input>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
