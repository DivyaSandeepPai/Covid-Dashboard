import React from "react";
import ReactDOM from "react-dom";
import {
  CovidLineGraph,
  CovidPieGraph,
  CovidDataBoxes,
  CovidProgressBar,
  CovidHealthNews,
} from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <CovidLineGraph />
  </React.StrictMode>,
  document.getElementById("covidlinegraph")
);

ReactDOM.render(
  <React.StrictMode>
    <CovidPieGraph />
  </React.StrictMode>,
  document.getElementById("covidPiegraph")
);
ReactDOM.render(
  <React.StrictMode>
    <CovidDataBoxes />
  </React.StrictMode>,
  document.getElementById("coviddatapanel")
);

ReactDOM.render(
  <React.StrictMode>
    <CovidProgressBar />
  </React.StrictMode>,
  document.getElementById("progressbar")
);

ReactDOM.render(
  <React.StrictMode>
    <CovidHealthNews />
  </React.StrictMode>,
  document.getElementById("healthnews")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
