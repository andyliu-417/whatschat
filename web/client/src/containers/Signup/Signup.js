import React, { Component } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="card-panel signup-panel">
          <form className="col s12" action="/" >
            <h4 className="center-align">Sign Up</h4>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  className="validate"
                />
                <label htmlFor="confirm_password">Confirm Password</label>
              </div>
            </div>
            <div className="row right-align">
              <input
                type="submit"
                className="waves-effect waves-light btn indigo lighten-1"
                value="Sign Up"
              />
            </div>
            <div className="row">
              <p className="right-align">
                {" "}
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
