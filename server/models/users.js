/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: users.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-02-05T19:43:41+01:00
 */

"use strict";

const mongoose = require("mongoose");

const MEMBERS = "Members";
const ADMINS = "Admins";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 254
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 254,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 254,
    select: false
  },
  role: {
    type: String,
    required: false,
    value: [MEMBERS, ADMINS],
    default: MEMBERS
  },
  firstname: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 254,
    select: false
  },
  lastname: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 254,
    select: false
  },
  city: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 254,
    select: false
  },
  age: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 254,
    select: false
  }
});

module.exports = mongoose.model("User", UserSchema);
