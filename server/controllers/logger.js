/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: logger.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:48:11+01:00
 */

exports.myLogger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const userId = req.userId ? req.userId : "";
  const body = req.body ? req.body : "";
  const ip = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"]
    : ""; // Requested into nginx conf.d /!\

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(method + " HITTING " + url);
  if (userId) console.log("user: " + userId);
  if (ip) console.log("ip: " + ip);
  if (method === "POST") console.log("body: " + body);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
  next();
};
