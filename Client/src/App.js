import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import RoomCreator from "./components/rooms/RoomCreator/RoomCreator";
import RoomView from "./components/rooms/RoomView/RoomView";
import MovieCreator from "./components/movies/MovieCreator";
import MovieView from "./components/movies/MovieView";
import SeanseCreator from "./components/seanses/SeanseCreator";
import SeanseView from "./components/seanses/SeanseView";
import MovieSeances from "./components/movies/MovieSeances";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/room-creator"
                component={RoomCreator}
              />
              <PrivateRoute exact path="/rooms" component={RoomView} />
              <PrivateRoute
                exact
                path="/movie-creator"
                component={MovieCreator}
              />
              <PrivateRoute exact path="/movies" component={MovieView} />
              <PrivateRoute
                exact
                path="/movie-seance"
                component={MovieSeances}
              />
              <PrivateRoute
                exact
                path="/seanse-creator"
                component={SeanseCreator}
              />
              <PrivateRoute exact path="/seanses" component={SeanseView} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;