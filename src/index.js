import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// redux
import store from "./store";
import { Provider } from "react-redux";
// css
import "./assets/css/app.2b0837a770c7b90031b1.css";
import "./assets/css/scripts.2b0837a770c7b90031b1.css";
import "./assets/css/cssloader-e87638f7bc9a.css";
import "./assets/css/css.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
