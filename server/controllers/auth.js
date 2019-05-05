/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: auth.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-02-05T19:54:04+01:00
 */

"use strict";

const jwt = require("jsonwebtoken");
const secret = "mysecret";
const passport = require("passport");
const CustomStrategy = require("passport-custom");

const MEMBERS = "Members";
const ADMINS = "Admins";

passport.use(
  "jwt",
  new CustomStrategy(async (req, callback, err) => {
    let token = req.headers["x-access-token"];
    if (!token) return callback(err);
    await jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      req.userId = decoded.id;
      callback(null, req);
    });
  })
);

exports.isAuthenticated = passport.authenticate(
  "jwt",
  {
    session: false
  },
  null
);
