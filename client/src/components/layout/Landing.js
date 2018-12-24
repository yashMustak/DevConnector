import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing1">
        <div className="landingNav">
          <h1 className="mainHeading">World of Developers</h1>
          <br />
          Create a developer profile/portfolio share post and get help from
          other developers
          <br />
          <br />
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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
