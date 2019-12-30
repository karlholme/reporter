import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.css";
import store from './../stores/configureStore'


ReactDOM.render(<App store={store} />, document.getElementById("app"));