import React, { Component } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { regisger } from "../../redux/user.redux";
import {Redirect} from 'react-router-dom';
import config from '../../config';

@connect(state => state.user, { regisger })
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pwd: "",
      repeatpwd: "",
      avatar: ""
    };
  }

  componentDidMount() {
    const rdm = Math.floor(Math.random() * Math.floor(8))
    this.setState({avatar: config.avatars[rdm]});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.regisger(this.state);
  };

  handleChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState({ [field]: value });
  };

  render() {
    return (
      <div className="container">
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <div className="card-panel signup-panel">
          <form className="col s12" action="/" onSubmit={this.handleSubmit}>
            <h4 className="center-align">Sign Up</h4>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="pwd"
                  className="validate"
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="confirm_password"
                  type="password"
                  name="repeatpwd"
                  className="validate"
                  onChange={this.handleChange}
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
