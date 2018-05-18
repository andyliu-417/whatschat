import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import registerServiceWorker from "./helpers/registerServiceWorker";
import Routes from "./routes";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducer";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk), // Async redux
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
