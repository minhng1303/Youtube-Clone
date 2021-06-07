import ReactDom from "react-dom";
import App from "./App";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./_root.scss";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { BrowserRouter as Router } from "react-router-dom";
ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);
