import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { login, clearErrMsg, clearRedirect } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import { message } from "antd";

@connect(state => state.user, { login, clearErrMsg, clearRedirect })
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: ""
    };
  }

  componentDidMount() {}

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state);
  };

  handleChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState({ [field]: value });
    if (this.props.msg) 
      this.props.clearErrMsg();
  };

  handleClick = () => {
    this.props.clearRedirect();
    this.props.history.push("/signup");
  }

  render() {
    const path = this.props.location.pathname;
    const { redirectTo, msg } = this.props;
    return (
      <div className="container">
        {redirectTo && redirectTo !== path ? (
          <Redirect to={redirectTo} />
        ) : null}
        <div className="card-panel login-panel">
          <form className="col s12" action="/" onSubmit={this.handleSubmit}>
            <h4 className="center-align">Login</h4>
            {msg ? message.error(msg) : null}
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  id="username"
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  id="password"
                  type="password"
                  name="pwd"
                  onChange={this.handleChange}
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
            </form>
 
            <div className="row">
              <p className="right-align">
                New to here? <a onClick={this.handleClick}>Sign Up</a>
              </p>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;
