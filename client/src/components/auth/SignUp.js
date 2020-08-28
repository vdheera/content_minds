import React from "react";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const SignUp = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/communities' />;
  }
  return (
    <Fragment>
      <div class='limiter center'>
        <div class='wrap-login100 center'>
          <form class='login100-form validate-form' onSubmit={onSubmit}>
            <span class='login100-form-title p-b-26'>Sign Up!</span>
            <span class='login100-form-title p-b-48'>
              <i class='zmdi zmdi-font'></i>
            </span>
            <div class='wrap-input100 validate-input'>
              <input
                type='name'
                class='input100'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div class='wrap-input100 validate-input'>
              <input
                type='email'
                class='input100'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div class='wrap-input100 validate-input'>
              <span class='btn-show-pass'>
                <i class='zmdi zmdi-eye'></i>
              </span>
              <input
                type='password'
                class='input100'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
                minLength='8'
              />
              <i class='zmdi zmdi-eye'></i>
              <span class='focus-input100'></span>
            </div>
            <div class='wrap-input100 validate-input'>
              <span class='btn-show-pass'>
                <i class='zmdi zmdi-eye'></i>
              </span>
              <input
                type='password'
                class='input100'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={onChange}
                minLength='8'
              />
              <i class='zmdi zmdi-eye'></i>
              <span class='focus-input100'></span>
            </div>

            <div class='container-login100-form-btn'>
              <div class='wrap-login100-form-btn'>
                <div class='login100-form-bgbtn'></div>
                <button class='login100-form-btn'>Sign Up</button>
              </div>
            </div>

            <div class='text-center p-t-115'>
              <span class='txt1'>Already have an account? </span>

              <Link class='txt2' to='/login'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  //isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(SignUp);
