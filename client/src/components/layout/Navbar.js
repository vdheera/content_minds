import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'> Hiatus</Link>
        </h1>
        <ul>
          <li>
            <Link to='/communities'>Communities</Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
