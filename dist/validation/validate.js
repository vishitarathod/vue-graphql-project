"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Validator {
  constructor() {
    _defineProperty(this, "validateRegisterUser", async (name, email, password, roleName) => {
      try {
        const pattern = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{3,10})";

        const schema = _joi.default.object().keys({
          name: _joi.default.string().required(),
          email: _joi.default.string().trim().email().required(),
          password: _joi.default.string().regex(RegExp(pattern)).required(),
          // .error(errors => {
          //   errors.forEach(err => {
          //       console.log(")))))",err.code)
          //       if(err.code="object.regex"){
          //           err.message = 'Password must contain one capital letter, one small letter and one special character and atleast 3 characters long '
          //       }else{
          //           err.message='password is required'
          //       }
          //   })
          //   return errors
          //    }),
          roleName: _joi.default.string()
        });

        const value = await schema.validateAsync({
          name,
          email,
          password,
          roleName
        }); // console.log(value)
      } catch (e) {
        // console.log(e.)
        throw new Error(e.details[0].message);
      }
    });

    _defineProperty(this, "validateLoginUser", async (email, password) => {
      try {
        const pattern = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{3,10})";

        const schema = _joi.default.object().keys({
          email: _joi.default.string().trim().email().required(),
          password: _joi.default.string().regex(RegExp(pattern)).required() // .error(errors => {
          //   errors.forEach(err => {
          //       console.log(")))))",err.code)
          //       if(err.code="object.regex"){
          //           err.message = 'Password must contain one capital letter, one small letter and one special character and atleast 3 characters long '
          //       }else{
          //           err.message='password is required'
          //       }
          //   })
          //   return errors
          //    }),

        });

        const value = await schema.validateAsync({
          email,
          password
        });
      } catch (e) {
        throw new Error(e.details[0].message);
      }
    });
  }

}

var _default = new Validator();

exports.default = _default;