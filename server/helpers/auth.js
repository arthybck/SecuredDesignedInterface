/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-10-27T15:47:50+02:00
 * @Email:  arthurbrunckpro@gmail.com
 * @Filename: auth.js
 * @Last modified by:   arthybck
 * @Last modified time: 2018-10-27T20:13:19+02:00
 */

'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const CustomStrategy = require('passport-custom');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secret = require('../config').secret;

passport.use('jwt', new CustomStrategy(
  async function(req, callback, err) {
    var token = req.headers['x-access-token'];
    if (!token) {
      return callback(err);
    }
    await jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return callback(err);
      }
      req.userId = decoded.id;
      callback(null, req);
    });
  }
));

exports.uniqUser = (username) => {
  console.log('unqUser passed username: ' + username)
  if (!username) {
    return false;
  } else {
    return User.findOne({
      username: username
    }).then((user) => {
      if (user)
        return true;
    }).catch((err) => {
      return false;
    })
  }
};

exports.isAuthenticated = passport.authenticate('jwt', {
  session: false
});