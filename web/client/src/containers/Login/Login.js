import React, { Component } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/user.redux";

@connect(state => state.user, { login })
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pwd: ''
    };
  }

  componentDidMount() {}

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username);

    this.props.login(this.state);
  };

  handleChange = event => {
    const field = event.target.name;
    const value = event.target.value;

    this.setState({ [field]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="card-panel login-panel">
          <form className="col s12" action="/" onSubmit={this.handleSubmit}>
            <h4 className="center-align">Login</h4>

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
