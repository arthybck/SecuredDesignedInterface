/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-10-27T15:47:50+02:00
 * @Email:  arthurbrunckpro@gmail.com
 * @Filename: auth.js
 * @Last modified by:   arthybck
 * @Last modified time: 2018-10-27T20:13:19+02:00
 */

'use strict';

const User = require("../models/users.js");

// This function checks if the user is Admin 
exports.isAdmin = async (req, res, forward) => {
    await User.findOne({ _id: req.user.userId }, (err, user) => {
        if (err) return res.status(500).send("Something went wrong: " + err);
        else if (user.role !== ADMINS) {
            return res.status(401).send("Insufficient permission.");
        } else {
            forward();
        }
    });
};

// This function checks if the user is a member 
exports.isMembers = async (req, res, forward) => {
    await User.findOne({ _id: req.user.userId }, (err, user) => {
        if (err) return res.status(500).send("Something went wrong: " + err);
        else if (user.role !== ADMINS && user.role !== MEMBERS) {
            return res.status(401).send("Insufficient permission.");
        } else {
            forward();
        }
    });
};
