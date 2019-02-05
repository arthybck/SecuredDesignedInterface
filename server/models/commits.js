/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: commits.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:48:35+01:00
 */

const mongoose = require("mongoose");

let CommitSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    default: "Xcrowzz",
    maxlength: 254
  },
  msg: {
    type: String,
    maxlength: 254
  },
  date: {
    type: String
  },
  repository: {
    type: String,
    required: true,
    maxlength: 254
  }
});

module.exports = mongoose.model("Commit", CommitSchema);
