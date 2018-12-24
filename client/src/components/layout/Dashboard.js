import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Dashboard extends Component {
  render() {
    const decoded = jwt_decode(localStorage.jwtToken);
    return (
      <div>
        Hi_
        {decoded.name}
      </div>
    );
  }
}

export default Dashboard;
