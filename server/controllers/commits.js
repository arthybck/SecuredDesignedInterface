/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: commits.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:27:22+01:00
 */

const Commit = require("../models/commits.js");

exports.fetchPayload = async (req, res) => {
  let results = JSON.parse(req.body.payload);

  for (let i = 0, len = results.commits.length; i < len; i++) {
    let commits = results.commits[i];
    let repos = results.repository;
    let commitMsg = commits.message ? commits.message : "";
    let commitAut = commits.author.username;
    let commitTim = commits.timestamp ? commits.timestamp : Date.now();
    let commitRep = repos.name ? repos.name : "";

    await Commit.create(
      {
        author: commitAut,
        msg: commitMsg,
        date: commitTim,
        repository: commitRep
      },
      err => {
        if (err) return res.status(500).send("Something went wrong: " + err);
      }
    );
  }
  return res.status(200).send("OK");
};

exports.getCommits = async (req, res) => {
  if (!req) return res.status(500).send("Something went wrong: " + err);

  await Commit.find({}, (err, commits) => {
    if (err) return res.status(500);
    else {
      console.log(commits);
      return res.status(200).send(commits);
    }
  });
};
