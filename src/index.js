import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const dotenv = require("dotenv");

// Let the dotenv package read and parse environment variables in the ./config/.enf file
dotenv.config({
  path: "./config/.env",
});

// Access the port environment variable using process.env
const PORT = process.env.PORT;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
