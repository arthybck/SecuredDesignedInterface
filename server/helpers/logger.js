/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2018-10-27T15:47:50+02:00
 * @Email:  arthurbrunckpro@gmail.com
 * @Filename: logger.js
 * @Last modified by:   arthybck
 * @Last modified time: 2018-10-27T20:13:19+02:00
 */

'use strict';

// Here this function will be used on the server as
// a middelware to display all the transactions
exports.myLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const userId = req.body.id ? req.body.id : '';
    const body = req.body ? req.body : '';
    const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : '';
    delete body.id;
    console.log(req.body)
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    console.log(method + ' HITTING ' + url);
    if (userId)
        console.log('user:', userId);
    if (ip)
        console.log('ip:', ip);
    if (method === 'POST' || method === 'PUT')
        console.log('body:', body);
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    next()
};