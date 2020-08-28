import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import PostForm from "./components/layout/PostForm";
import Communities from "./components/layout/Communities";
import WritePost from "./components/layout/WritePost";
import Alert from "./components/layout/Alert";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";
import MyProfile from "./components/profile/MyProfile";
import Profiles from "./components/Profiles/Profiles";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import IndividualPost from "./components/layout/IndividualPost";
import "./App.css";
import "./css/main.css";
import "./css/util.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/users' component={Profiles} />
              <PrivateRoute exact path='/users/:id' component={Profile} />
              <Route exact path='/communities/:id' component={Post} />
              <Route exact path='/post/:id' component={PostForm} />
              <Route exact path='/communities' component={Communities} />
              <PrivateRoute exact path='/me' component={MyProfile} />
              <PrivateRoute
                exact
                path='/posts/:id'
                component={IndividualPost}
              />
              <Route exact path='/makepost' component={WritePost} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
