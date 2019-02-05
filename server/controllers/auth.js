/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: auth.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:24:20+01:00
 */

"use strict";

const jwt = require("jsonwebtoken");
const secret = process.env.TokenSuperSecret
  ? process.env.TokenSuperSecret
  : "SuperSecret";
const passport = require("passport");
const CustomStrategy = require("passport-custom");

const User = require("../models/users.js");

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

exports.isMembers = async (req, res, next) => {
  await User.findOne({ _id: req.user.userId }, (err, user) => {
    if (err) return res.status(500).send("Something went wrong: " + err);
    else if (user.role !== ADMINS && user.role !== MEMBERS) {
      return res.status(401).send("Insufficient permission.");
    } else {
      next();
    }
  });
};

exports.isAuthenticated = passport.authenticate(
  "jwt",
  {
    session: false
  },
  null
);
