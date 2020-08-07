import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' action='create-profile.html'>
          <div className='form-group'>
            <input type='text' placeholder='Name' name='name' required />
          </div>
          <div className='form-group'>
            <input type='email' placeholder='Email Address' name='email' />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='8'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='8'
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </Fragment>
    );
  }
}

export default SignUp;
