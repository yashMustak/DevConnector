import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="sara">
        <div className="head">
          <h1>Sign Up</h1>
          <br />
          Create your DevConnector account
          <br />
          <br />
        </div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": errors.name
              })}
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className={classnames("form-control", {
                "is-invalid": errors.email
              })}
              aria-describedby="emailHelp"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <small id="emailHelp" className="form-text text-muted">
              This site uses Gravitar, so if you wan't to use profile image, use
              Gravitar email.
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": errors.password
              })}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": errors.password2
              })}
              placeholder="Confirm Password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
