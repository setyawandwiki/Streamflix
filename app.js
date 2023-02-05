require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const routeNavigation = require("./src/routes/index");
const listEndpoints = require("express-list-endpoints");

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(compression());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", routeNavigation);

console.log(listEndpoints(app));

module.exports = app;
