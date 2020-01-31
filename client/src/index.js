import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./style/styles.css";
import store from './stores/configureStore'
import favicon from '../assets/favicon.ico'

ReactDOM.render(<App store={store} />, document.getElementById("app"));