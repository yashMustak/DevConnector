import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing1">
        <div className="landingNav">
          <h1 className="mainHeading">Developer Connector</h1>
          <br />
          Create a developer profile/portfolio share post and get help from
          other developers
          <br />
          <br />
          {/* <button type="button" className="btn btn-primary">
            Sign Up
          </button>
          <button type="button" className="btn btn-light">
            Login
          </button> */}
          <Link
            to="/register"
            class="btn btn-primary btn-lg active buttonCustom"
            role="button"
            aria-pressed="true"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            class="btn btn-secondary btn-lg active buttonCustom"
            role="button"
            aria-disabled="true"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
