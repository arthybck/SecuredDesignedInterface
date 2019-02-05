/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: users.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:48:40+01:00
 */

"use strict";

const mongoose = require("mongoose");

const SCOUT = "Scout";
const MEMBERS = "Members";
const ADMINS = "Admins";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 254
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 254,
    select: false
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 254,
    trim: true,
    match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    // Ref :            RFC 5322 compliant regex
    // Visualizer :     https://regexper.com/#(%3F%3A%5Ba-z0-9!%23%24%25%26'*%2B%2F%3D%3F%5E_%60%7B%7C%7D~-%5D%2B(%3F%3A%5C.%5Ba-z0-9!%23%24%25%26'*%2B%2F%3D%3F%5E_%60%7B%7C%7D~-%5D%2B)*%7C%22(%3F%3A%5B%5Cx01-%5Cx08%5Cx0b%5Cx0c%5Cx0e-%5Cx1f%5Cx21%5Cx23-%5Cx5b%5Cx5d-%5Cx7f%5D%7C%5C%5C%5B%5Cx01-%5Cx09%5Cx0b%5Cx0c%5Cx0e-%5Cx7f%5D)*%22)%40(%3F%3A(%3F%3A%5Ba-z0-9%5D(%3F%3A%5Ba-z0-9-%5D*%5Ba-z0-9%5D)%3F%5C.)%2B%5Ba-z0-9%5D(%3F%3A%5Ba-z0-9-%5D*%5Ba-z0-9%5D)%3F%7C%5C%5B(%3F%3A(%3F%3A(2(5%5B0-5%5D%7C%5B0-4%5D%5B0-9%5D)%7C1%5B0-9%5D%5B0-9%5D%7C%5B1-9%5D%3F%5B0-9%5D))%5C.)%7B3%7D(%3F%3A(2(5%5B0-5%5D%7C%5B0-4%5D%5B0-9%5D)%7C1%5B0-9%5D%5B0-9%5D%7C%5B1-9%5D%3F%5B0-9%5D)%7C%5Ba-z0-9-%5D*%5Ba-z0-9%5D%3A(%3F%3A%5B%5Cx01-%5Cx08%5Cx0b%5Cx0c%5Cx0e-%5Cx1f%5Cx21-%5Cx5a%5Cx53-%5Cx7f%5D%7C%5C%5C%5B%5Cx01-%5Cx09%5Cx0b%5Cx0c%5Cx0e-%5Cx7f%5D)%2B)%5C%5D)
    // SFSM :           https://en.wikipedia.org/wiki/Finite-state_machine
    // Xcrowzz' note :  Seems to work for 99.99% of email addresses, containing either local, DNS zone and/or IPv4/v6 addresses.
    // Xcrowzz' note :  Regex can be targeted for Catastrophic Backtracking (https://www.regular-expressions.info/catastrophic.html) ; See https://www.npmjs.com/package/vuln-regex-detector to check 'em before someone DDOS the f'''' out of your app.
  },
  role: {
    type: String,
    required: true,
    value: [SCOUT, MEMBERS, ADMINS],
    default: SCOUT
  }
});

module.exports = mongoose.model("User", UserSchema);
