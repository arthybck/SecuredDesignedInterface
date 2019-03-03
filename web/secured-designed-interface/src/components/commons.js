/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T14:48:02+01:00
 * @Filename: commons.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:48+01:00
 */

import axios from "axios";

const url = "http://localhost:3080/";

export const register = ({ email, username, password }) =>
  axios
    .post(
      `${url}register`,
      { email: email, username: username, password: password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(result => {
      const res = result.data.results;
      console.log("register -> ", res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });

export const login = ({ username, password }) =>
  axios
    .post(
      `${url}login`,
      {
        username,
        password
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(result => {
      const res = result.data.results;
      console.log("login -> ", res);
      return res;
    })
    .catch(err => {
      console.log(err);
    });
