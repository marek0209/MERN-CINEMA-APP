import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  handleClick = (e) => {
    this.props.logoutUser();
    console.log("work");
  };
  render() {
    if (localStorage.getItem("jwtToken")) {
      return (
        <>
          <div className="navbar-fixed">
            <nav className="z-depth-0">
              <div className="nav-wrapper indigo">
                <Link
                  to="/"
                  style={{
                    fontFamily: "monospace",
                  }}
                  className="col s5 brand-logo center white-text"
                >
                  <i className="material-icons">code</i>
                  MERN
                </Link>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li onClick={this.handleClick}>
                    <Link to="/">Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </>
      );
    }
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper indigo">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
              }}
              className="col s5 brand-logo center white-text"
            >
              <i className="material-icons">code</i>
              MERN
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
