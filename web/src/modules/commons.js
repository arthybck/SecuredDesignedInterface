/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-03-03T14:48:02+01:00
 * @Filename: commons.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:48+01:00
 */

import axios from 'axios';

const url = 'http://localhost:3080/';

let userToken = null;

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
      console.log('result login function: ', result);
      return result;
    })
    .catch(err => {
      console.log('error login:', err)
      throw err;
    });

export const logout = () =>
  axios({
    method: 'POST',
    url: `${url}logout`,
    headers: { 'x-access-token': userToken }
  })
    .then(result => {
      console.log('result logout function: ', result);
      return true;
    })
    .catch(err => {
      console.log('error logout:', err)
      throw err;
    });

export const listUsers = token =>
  axios({
    method: 'GET',
    url: `${url}users`,
    headers: { 'x-access-token': token }
  })
    .then(result => {
      userToken = token;
      console.log(result);
      return result;
    })
    .catch(err => {
      userToken = token;
      console.log(err);
      throw err;
    });
