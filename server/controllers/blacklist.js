/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: jwt.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-03-03T17:48:09+01:00
 */

'use strict';

const Blacklist = require('../models/blacklist.js');

exports.addTokenToBlacklist = (token) => {
    console.log(token);
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

exports.checkBlacklist = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    Blacklist.findOne(
        { token },
        (err, token) => {
            console.log(err);
            console.log(token);
            if (token) {
                res.status(401).send({
                    message: 'The user token expired'
                });
            }
            next();
        });
}