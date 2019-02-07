/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: users.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-02-07T09:25:43+01:00
 */

"use strict";

const User = require("../models/users.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "mysecret";

const MEMBERS = "Members";
const ADMINS = "Admins";

exports.logUser = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("Bad Request");
  }
  User.findOne(
    {
      username: req.body.username
    },
    async (err, user) => {
      if (err) return res.status(500).send("Internal Server Error");
      if (!user) return res.status(404).send("Not Found");

      let passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        let token = jwt.sign(
          {
            id: user._id
          },
          secret,
          {
            expiresIn: 86400
          }
        ); // 24 hours
        return res.status(200).send({
          auth: true,
          token: token
        });
      } else return res.status(404).send("Not Found");
    }
  ).select("+password");
};

exports.registerUser = (req, res) => {
  if (!req || !req.body.username || !req.body.password || !req.body.email)
    return res.status(400).send("Bad Request");
  else {
    bcrypt.hash(req.body.password, 8, async (err, hashedPassword) => {
      await User.create(
        {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        },
        err => {
          if (err) return res.status(500).send("Internal Server Error");
          else return res.status(200).send("Created");
        }
      );
    });
  }
};

exports.passwordReset = (req, res) => {
  if (!req || !req.body.email || !req.body.password)
    return res.status(400).send("Bad Request");
  else {
    bcrypt.hash(req.body.password, 8, async (err, hashedPassword) => {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hashedPassword } },
        err => {
          if (err) return res.status(500).send("Internal Server Error");
          else return res.status(200).send("Created");
        }
      );
    });
  }
};

exports.getUsers = async (req, res) => {
  if (!req || !req.user || !req.user.userId) {
    return res.status(400).send("Bad Request");
  } else {
    await User.find({}, (err, users) => {
      if (err) return res.status(500).send("Internal Server Error");
      else return res.status(200).send(users);
    });
  }
};

// exports.getHighMemberss = async (req, res) => {
//   if (!req || !req.user) return res.status(400).send("Bad Request");
//   else {
//     await User.find(
//       {
//         role: ADMINS
//       },
//       (err, users) => {
//         if (err) return res.status(500).send("Internal Server Error");
//         else {
//           return res.status(200).send(users);
//         }
//       }
//     );
//   }
// };

// exports.getMemberss = async (req, res) => {
//   if (!req || !req.user) return res.status(400).send("Bad Request");
//   else {
//     await User.find(
//       {
//         role: MEMBERS
//       },
//       (err, users) => {
//         if (err) return res.status(500).send("Internal Server Error");
//         else {
//           return res.status(200).send(users);
//         }
//       }
//     );
//   }
// };

exports.getUser = async (req, res) => {
  if (!req || !req.user || !req.user.userId)
    return res.status(400).send("Bad Request");
  else {
    await User.findById(
      {
        _id: req.user.userId
      },
      (err, user) => {
        if (err) return res.status(500).send("Internal Server Error");
        else return res.status(200).send(user);
      }
    );
  }
};

// TODO: fix the asyn problem in the response body of the request
exports.putUser = async (req, res) => {
  if (!req || !req.user || !req.user.userId)
    return res.status(400).send("Bad Request");
  else {
    await User.findById(
      {
        _id: req.body.id
      },
      async (err, user) => {
        if (err) return res.status(500).send("Internal Server Error");
        if (!user) return res.status(404).send("Not Found");
        else {
          if (req.body.username) {
            await user.update(
              {
                $set: {
                  username: req.body.username
                }
              },
              err => {
                if (err) console.log(err);
              }
            );
          }
          if (req.body.role) {
            await user.update(
              {
                $set: {
                  role: req.body.role
                }
              },
              err => {
                if (err) console.log(err);
              }
            );
          }
          return res.status(200).send(user);
        }
      }
    );
  }
};
