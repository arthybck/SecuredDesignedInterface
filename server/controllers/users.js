/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: users.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:09+01:00
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
  ).select("password");
};

exports.registerUser = (req, res) => {
  console.log(req.body);
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

// exports.getAdmins = async (req, res) => {
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

// exports.getMembers = async (req, res) => {
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

// TODO: fix the async problem in the response body of the request
exports.putUser = async (req, res) => {
  if (!req || !req.user || !req.user.userId)
    return res.status(400).send("Bad Request");
  else {
    await User.findById({ _id: req.body.id },
      async (err, user) => {
        if (err) return res.status(500).send("Internal Server Error");
        if (!user) return res.status(404).send("Not Found");
        else {
          if (req.body && req.body.username && req.body.firstname && req.body.lastname && req.body.age && req.body.email && req.body.city) {
            await user.update(
              {
                $set: {
                  username: req.body.username,
                  firstname: req.body.firstname,
                  lastname: req.body.lastname,
                  age: req.body.age,
                  email: req.body.email,
                  city: req.body.city,
                }
              },
              err => {
                if (err) console.log(err);
                return res.status(500).send({ message: 'Internal server error, the user ' });
              }
            );
            return res.status(200).send(user);
          }
          return res.status(500).send({ message: 'Internal server error, the user ' });
        }
      }
    );
  }
};
