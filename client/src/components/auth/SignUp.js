import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  state = {
    token: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  onChangeName = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.name);
    this.setState({ name: e.target.value });
    console.log(this.state.name);
  };
  onChangeEmail = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.name);
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  };
  onChangeP1 = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.name);
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  };
  onChangeP2 = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.name);
    this.setState({ password2: e.target.value });
    console.log(this.state.password2);
  };
  async onSubmit() {
    console.log(this.state.name);
    console.log("hit register properly");

    //e.preventDefault();
    if (this.state.password !== this.state.password2) {
      console.log("Passwords do not match");
    } else {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("hi");
      const body = JSON.stringify(newUser);
      const res = await axios.post("http://localhost:5000/users", body, config);
      console.log(res.data);

      this.setState({ token: res.data });
    }
  }
  render() {
    return (
      <Fragment>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={this.name}
              onChange={(e) => this.onChangeName(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={this.email}
              onChange={(e) => this.onChangeEmail(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.password}
              onChange={(e) => this.onChangeP1(e)}
              minLength='8'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={this.password2}
              onChange={(e) => this.onChangeP2(e)}
              minLength='8'
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Register'
            onSubmit={this.onSubmit}
          />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </Fragment>
    );
  }
}

export default SignUp;
