/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: blacklist.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:09+01:00
 */

'use strict';

const Blacklist = require('../models/blacklist.js');


// This function add a token to the blacklisted DB
exports.addTokenToBlacklist = (token) => {
    console.log('add this token to blacklist:', token);
    const tokenObj = { token };
    Blacklist.create(tokenObj, (err, data) => {
        console.log(data);
        if (err) {
            return false
        } else {
            return true;
        }
    });
}

// This function check if a token has been blacklisted and will return a status 401 if needed
exports.checkBlacklist = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    await Blacklist.findOne(
        { token },
        (err, dbToken) => {
            console.log("founded token: ", dbToken);
            if (dbToken) {
                res.status(401).send({
                    message: 'The user token expired'
                });
            }
            next();
        });
}