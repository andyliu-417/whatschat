import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import App from "./containers/App/App";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Chat from "./containers/Chat/Chat";
import Contacts from "./containers/Contacts/Contacts";


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Auth />
          <App />
          <Switch>
            {/* <Route path="/chat/:user" component={Chat} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Chat} />            
            {/* <Route path="/contacts" component={Contacts} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
