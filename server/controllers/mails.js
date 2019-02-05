/**
 * @Author: Arthur Brunck <arthybck>
 * @Date:   2019-01-22T11:14:16+01:00
 * @Filename: mails.js
 * @Last modified by:   arthybck
 * @Last modified time: 2019-01-22T12:48:24+01:00
 */

const nodemailer = require("nodemailer");

let mailUser = process.env.MAIL_USER ? process.env.MAIL_USER : "";
let mailPass = process.env.MAIL_PASS ? process.env.MAIL_PASS : "";

let imapConfig = {
  host: "pro1.mail.ovh.net",
  port: 587,
  secure: false,
  auth: {
    user: mailUser,
    pass: mailPass
  },
  tls: {
    rejectUnauthorized: true
  }
};

const transporter = nodemailer.createTransport(imapConfig);

exports.sendMail = (req, res) => {
  if (
    !req ||
    !req.body ||
    !req.body.email ||
    !req.body.subject ||
    !req.body.text
  ) {
    return res.status(400).send("Bad Request");
  } else {
    let mailOptions = {
      from: req.body.email,
      to: mailUser,
      subject: req.body.subject,
      text: req.body.text
    };
    transporter.sendMail(mailOptions, (error, info) => {
      console.log("[*] Initializing debugging process");
      console.log("[+] Info: " + info);
      console.log("[!] Error: " + error);
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).send(info.response);
      }
    });
  }
};
