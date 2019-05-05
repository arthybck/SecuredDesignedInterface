/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: users.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:09+01:00
 */

'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/users.js');
const blacklist = require('./blacklist.js');

const secret = 'mysecret';
const MEMBERS = 'Members';
const ADMINS = 'Admins';

// This method is used to create a user in the database
exports.registerUser = (req, res) => {
  const {
    username,
    email,
    password,
    firstname,
    lastname,
    age,
    city
  } = req.body;
  if (!req || !username || !password || !email) {
    return res.status(400).send('Bad Request');
  } else {
    // Here we hash the password so it is not crystal clear to decode it
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      const user = {
        username: username,
        email: email,
        password: hashedPassword,
        firstname: firstname ? firstname : '',
        lastname: lastname ? lastname : '',
        age: age ? age : '',
        city: city ? city : ''
      };
      // We create the user using the mongoose model
      await User.create(user, (err, data) => {
        if (err) {
          if (err.code === 11000) {
            return res
              .status(409)
              .send({ message: 'User already exist.', data: err });
          }
          return res.status(500).send({
            message: 'Internal Server Error, malformatted data',
            data: err
          });
        } else {
          delete user.password;
          user._id = data._id;
          return res.status(200).send({
            message: `User ${username} successfully created`,
            data: user
          });
        }
      });
    });
  }
};

// This method is used to login a user. we check his credentials
// and provide a token so he can use the rest of the API functionnality
exports.logUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Bad Request');
  }
  User.findOne(
    {
      username: username
    },
    async (err, user) => {
      if (err) return res.status(500).send('Internal Server Error');
      if (!user) return res.status(404).send('Not Found');

      const passwordIsValid = await bcrypt.compare(password, user.password);
      console.log(passwordIsValid)
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
      } else return res.status(404).send('Not Found');
    }
  ).select('password');
};

// This method is used to reset a user's password
exports.passwordReset = (req, res) => {

  const { email, password } = req.body;
  if (!req || !email || !password) return res.status(400).send('Bad Request');
  else {
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
      await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } },
        err => {
          if (err) return res.status(500).send('Internal Server Error');
          else return res.status(200).send('Password successfully updated');
        }
      );
    });
  }
};

// This method is used to get all the users from the db
exports.getUsers = async (req, res) => {
  if (!req) {
    return res.status(400).send('Bad Request');
  } else {
    // Find all user documents in the database and returning it including
    // the fields specified as a second parameter
    await User.find(
      {},
      'username firstname lastname city age role email',
      (err, users) => {
        if (err) return res.status(500).send('Internal Server Error');
        else return res.status(200).send(users);
      }
    );
  }
};

// This method is used to return a specific user from the db
exports.getUser = async (req, response) => {
  const { userId } = req.user;

  if (!req || !req.user || !userId)
    return response.status(400).send('Bad Request');
  else {
    // Find the user find :userId in the database and return it
    // including  the fields specified as a second parameter
    await User.findOne(
      { _id: userId },
      'username firstname lastname city age role email',
      (err, user) => {
        if (err) return response.status(500).send('Internal Server Error');
        else return response.status(200).send(user);
      }
    );
  }
};

// This method is used to update a user fields
exports.putUser = async (req, response) => {
  const { username, email, firstname, lastname, age, city } = req.body;
  const { userId } = req.user;

  if (!req || !req.user || !userId)
    return response.status(400).send('Bad Request');
  else {
    // We require all the fields to be in the body
    if (req.body && username && firstname && lastname && age && email && city) {
      const userData = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        city: city
      };
      // Here we fetch the use byId which is faster than a findAll + filter
      await User.findById({ _id: userId }, async (err, user) => {
        if (err)
          return response
            .status(500)
            .send({ message: 'Internal Server Error', error: err });
        if (!user) return response.status(404).send('User not Found');
        else {
          await User.updateOne(
            { _id: userId },
            {
              $set: userData
            }
          ).then(result => {
            if (result.nModified > 0) {
              return response.status(200).send({
                message: `User ${username} successfully updated.`,
                data: userData
              });
            } else {
              return response.status(200).send({
                message: `No data needed to be udpated for the user ${username}`,
                data: userData
              });
            }
          });
        }
      });
    } else {
      return res.status(500).send({
        message: 'Internal server error, not enough information to update'
      });
    }
  }
};

// This function logout the user, he would be able to use the token to make requests
exports.logout = (req, res) => {
  console.log('logout')
  if (req && req.headers) {
    const token = req.headers["x-access-token"];

    // Here we add the token to the blacklist in the DB
    blacklist.addTokenToBlacklist(token);
    console.log(blacklist.checkBlacklist(token));
  }
  // Set the jwt token to false
  passport.authenticate('jwt', {
    session: false
  })
  // The client only have to take the null value of the token
  res.status(200).send({
    auth: false,
    token: null
  });
}
