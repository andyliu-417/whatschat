import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loadData } from "../../redux/user.redux";

import { Redirect } from "react-router-dom";

@withRouter
@connect(state => state.user, { loadData })
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherPage: false
    };
  }

  componentDidMount() {
    const publicList = ["/login", "/signup"];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    this.setState({ otherPage: true });

    this.props.loadData();
  }

  render() {
    return (
      <div>
        {this.props.error && this.state.otherPage ? (
          <Redirect to="/login" />
        ) : null}
      </div>
    );
  }
}

export default Auth;
