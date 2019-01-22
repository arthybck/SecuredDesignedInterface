/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: server.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-01-22T19:17:44+01:00
 */

"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");

const port = process.env.BUILD_ENVIRONMENT === "PRODUCTION" ? 3000 : 3080;
const mongooseUri =
  process.env.BUILD_ENVIRONMENT === "PRODUCTION"
    ? "mongodb://localhost:27017/arthybck"
    : "mongodb://localhost:27017/arthybck-dev";

console.time("[*] Booting");
initMongoConnect();
if (process.env.BUILD_ENVIRONMENT !== "PRODUCTION") {
  initTestUsers();
}

const app = express();
configApp(app);

function configApp(app) {
  app.use(helmet());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());

  app.use((req, res, next) => {
    // Overrides Helmet() basic properties
    res.header("Content-Security-Policy", "default-src 'self'"); // Added layer to prevent from injections (See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP to write the appropriate policy)
    res.header("X-Frame-Options", "SAMEORIGIN"); // ClickJacking/ClickBaiting Protection
    res.header("X-XSS-Protection", "1; mode=block"); // XSS Protection (see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
    res.header("X-Content-Type-Options", "nosniff"); // No-Sniffing Content-Type
    res.header("Access-Control-Allow-Origin", "*"); // CORS Spec
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    ); // General Allowed Methods
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, x-access-token, Accept"
    ); // Access Control Exhaustive List
    next();
  });
  configRouter(app);
}

function configRouter(app) {
  let router = express.Router();

  router.route("/").get(logController.myLogger, (req, res) => {
    return res.status(200).send("Hello World!");
  });
  app.use(router);
}

function initMongoConnect() {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    mongooseUri,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  );
}

const server = app.listen(port, () => {
  console.log("[*] Written and maintained by Arthybck");
  console.log(
    "[*] Before running the app, consider 'npm audit' to check for any vulnerabilities"
  );
  console.log(
    "[*] Moreover, have a look at : https://www.npmjs.com/advisories\n\n"
  );
  console.log(
    "[*] REST API listening at: %s:%s",
    server.address().address,
    server.address().port
  );
  console.log("[*] Mongoose URI: %s", mongooseUri);

  console.timeEnd("[*] Booting");
  console.log("\n\n\r");

  process.on("SIGINT", () => {
    console.log("\n\n[@+] So long, and thanks for all the fish !\n\r");
    process.exit(0);
  });
});
