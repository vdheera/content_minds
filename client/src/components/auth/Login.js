import React, { useState } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Form from "react-bootstrap/Form";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/communities' />;
  }
  return (
    <Fragment>
      <div class='limiter center'>
        <div class='wrap-login100 center'>
          <form class='login100-form validate-form' onSubmit={onSubmit}>
            <span class='login100-form-title p-b-26'>Login!</span>
            <span class='login100-form-title p-b-48'>
              <i class='zmdi zmdi-font'></i>
            </span>
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

            <div class='container-login100-form-btn'>
              <div class='wrap-login100-form-btn'>
                <div class='login100-form-bgbtn'></div>
                <button class='login100-form-btn'>Login</button>
              </div>
            </div>

            <div class='text-center p-t-115'>
              <span class='txt1'>Don’t have an account? </span>

              <Link class='txt2' to='/signup'>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { login })(Login);
