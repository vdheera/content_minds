import React, { Component } from "react";
import axios from "axios";

class Communities extends Component {
  render() {
    return (
      <div onLoad='getallposts()'>
        <h1 class='large text-primary'>Communities</h1>
        <p class='lead'>Join a community</p>
        <div></div>
      </div>
    );
  }
}

export default Communities;
