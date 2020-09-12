const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// Loading dotenv file
require("dotenv").config();

// Mongoose connection string
mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt");
// Mongoose error handler
mongoose.connection.on("error", (error) => console.log(error));
// Mongoose promise configeration
mongoose.Promise = global.Promise;

// Loading auth middleware
require("./auth/auth");

// Loading bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Public unsecure routes
const routes = require("./routes/routes");

// Private secure user routes
const secureRoute = require("./routes/secure-routes");

// Public routes
app.use("/", routes);

//Privates routes with auth middleware
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
