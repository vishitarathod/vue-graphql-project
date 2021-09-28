"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signAccessToken = signAccessToken;
exports.signReferesToken = signReferesToken;
exports.veifyRefreshToken = veifyRefreshToken;
exports.decodeToken = decodeToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServerErrors = require("apollo-server-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//generate access token
function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.secret;
    const option = {
      expiresIn: '20s',
      audience: userId
    }; //generate token

    _jsonwebtoken.default.sign(payload, secret, option, (err, token) => {
      if (err) {
        console.log(err);
        return reject(Error());
      }

      resolve(token);
    });
  });
} //generate refresh token


function signReferesToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.secretRef;
    const option = {
      expiresIn: '15h',
      audience: userId
    }; //generate token

    _jsonwebtoken.default.sign(payload, secret, option, (err, token) => {
      if (err) {
        console.log(err);
        return reject(Error());
      }

      resolve(token);
    });
  });
} //verify refresh token


async function veifyRefreshToken(token) {
  try {
    // console.log("token+++++",token)
    const payload = await _jsonwebtoken.default.verify(token, process.env.secretRef); //  console.log(payload)

    return payload.aud;
  } catch (error) {
    return error;
  }
} //decode access token


async function decodeToken(token) {
  try {
    const payload = await _jsonwebtoken.default.verify(token, process.env.secret); // console.log(data)

    return payload;
  } catch (error) {
    throw new Error('invalid token');
  }
}