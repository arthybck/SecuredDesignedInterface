/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T14:48:02+01:00
 * @Filename: commons.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:48+01:00
 */

import axios from 'axios';

const url = 'http://localhost:3080/';

export const register = ({ email, username, password }) =>
  axios({
    method: 'POST',
    url: `${url}register`,
    data: { email, username, password }
  })
    .then(result => {
      const res = result.data.data;
      console.log(res);
      return res;
    })
    .catch(err => {
      throw err;
    });

export const login = ({ username, password }) =>
  axios({
    method: 'POST',
    url: `${url}login`,
    data: { username, password }
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      throw err;
    });

export const listUsers = token =>
  axios({
    method: 'GET',
    url: `${url}users`,
    headers: { 'x-access-token': token }
  })
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
