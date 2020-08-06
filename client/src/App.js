import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Communities from "./components/layout/Communities";

import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={SignUp} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/communities' component={Communities} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
