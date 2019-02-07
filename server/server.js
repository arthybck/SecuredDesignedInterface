/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: server.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-02-07T09:32:42+01:00
 */

"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");

const authController = require("./controllers/auth.js");
const userController = require("./controllers/users.js");
//TODO seed to apply for the delivery
// const seed = require("./seed.js

const port = process.env.BUILD_ENVIRONMENT === "PRODUCTION" ? 3000 : 3080;
const mongooseUri =
  process.env.BUILD_ENVIRONMENT === "PRODUCTION"
    ? "mongodb://localhost:27017/arthybck"
    : "mongodb://localhost:27017/arthybck-dev";

const initMongoConnection = () => {
  console.time("[*] Booting");
  mongoose.Promise = global.Promise;
  mongoose.connect(
    mongooseUri,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
};

const app = express();
configApp(app);

const configApp = app => {
  app.use(helmet());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use((req, res, forward) => {
    res.header("Content-Security-Policy", "default-src 'self'");
    res.header("X-Frame-Options", "SAMEORIGIN");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, x-access-token, Accept"
    );
    forward();
  });
  routerConfiguration(app);
};

const routerConfiguration = app => {
  const router = express.Router();

  router.route("/").get((req, res) => {
    return res.status(200).send("Hello World!");
  });

  // ------------------------ USER CONTROLLER ------------------------

  //Register    --- POST
  router.route("/register").post(userController.registerUser);

  //Login       --- POST
  router.route("/login").post(userController.logUser);

  //Profile     --- GET
  router
    .route("/profile")
    .get(authController.isAuthenticated, userController.getUser);

  //Profile     --- GET PUT
  router
    .route("/users")
    .get(
      authController.isAuthenticated,
      authController.isMembers,
      userController.getUsers
    )
    .put(
      authController.isAuthenticated,
      authController.isMembers,
      userController.putUser
    );

  //Profile     --- GET
  router.route("/logout").get((req, res) => {
    res.status(200).send({
      auth: false,
      token: null
    });
  });

  app.use(router);
};

const server = app.listen(port, () => {
  console.log(
    "[*] REST API listening at: %s:%s",
    server.address().address,
    server.address().port
  );
  console.log("[*] Mongoose URI: %s", mongooseUri);

  console.log("\n\n\r");

  process.on("SIGINT", () => {
    console.log("\n\nServer shutting down  !\n\r");
    process.exit(0);
  });
});
