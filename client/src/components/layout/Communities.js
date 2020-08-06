import React from "react";
import axios from 'axios'; 

const Communities = () => {
    function getallposts() { 
        axios.get('./posts')
    }
  return (
    <div onLoad="getallposts()">
      <h1 class='large text-primary'>Communities</h1>
      <p class='lead'>Join a community</p>
      <div>

      </div>
    </div>
  );
};

export default Communities;
