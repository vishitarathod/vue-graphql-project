"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPassword = verifyPassword;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function verifyPassword(plainPass, encPass) {
  try {
    const result = await _bcrypt.default.compare(plainPass, encPass);
    return result;
  } catch (error) {
    return error;
  }
}