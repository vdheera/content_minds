import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Posts from "./components/layout/Posts";
import Communities from "./components/layout/Communities";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />s
          <Navbar />
          <section className='container'>
            <Switch>
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/communities' component={Communities} />
              <Route exact path='/posts' component={Posts} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    );
  }
}

export default App;
