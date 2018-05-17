import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Auth />
          <Switch>
            <Route path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
