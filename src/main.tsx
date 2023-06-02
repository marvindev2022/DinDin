import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
