import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="card-panel login-panel">
          <form className="col s12" action="/" onSubmit={this.props.onSubmit}>
            <h4 className="center-align">Login</h4>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  id="email"
                  type="email"
                  name="email"
                  onChange={this.props.onChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  id="password"
                  type="password"
                  name="password"
                  onChange={this.props.onChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row right-align">
              <input
                type="submit"
                className="waves-effect waves-light btn indigo lighten-1"
                value="Log in"
              />
            </div>

            <div className="row">
              <p className="right-align">
                New to here? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
