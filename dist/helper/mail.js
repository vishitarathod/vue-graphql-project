"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailSend = mailSend;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function mailSend(email, text) {
  try {
    //mail configuration
    var transporter = _nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    var mail = {
      from: process.env.EMAIL,
      to: email,
      subject: "forget password",
      html: `${text}`
    }; //send mail

    const result = await transporter.sendMail(mail);
    return result;
  } catch (error) {
    return error;
  }
}