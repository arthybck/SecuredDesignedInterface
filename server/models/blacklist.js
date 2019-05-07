/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: blacklist.js
 * @Last modified by:   Arthur Brunck
 * @Last modified time: 2019-02-05T19:43:41+01:00
 */

'use strict';

const mongoose = require('mongoose');

const BlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('Blacklist', BlacklistSchema);
