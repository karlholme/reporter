import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
//import "./style/bootstrap.css";
import "./style/styles.css";
import store from './../stores/configureStore'


ReactDOM.render(<App store={store} />, document.getElementById("app"));