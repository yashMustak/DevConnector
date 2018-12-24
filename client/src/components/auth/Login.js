import React, { Component } from "react";
// import axios from "axios";
// import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="sara">
        <div className="head">
          <h1>Login</h1>
          <br />
          Login to your DevConnector account
          <br />
          <br />
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="email"
            error={errors.email}
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            type="password"
            error={errors.password}
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}

loginUser.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
