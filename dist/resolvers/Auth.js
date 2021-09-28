"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _verifyPassword = require("../helper/verifyPassword.js");

var _jwt = require("../helper/jwt.js");

var _mail = require("../helper/mail.js");

var _validate = _interopRequireDefault(require("../validation/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Mutation: {
    //user registration
    async register(parent, {
      registerInput: {
        name,
        email,
        password,
        roleName
      }
    }, {
      prisma
    }, info) {
      //validate data
      const data = await _validate.default.validateRegisterUser(name, email, password, roleName);

      try {
        //cheack for email is alreday register or not
        const isEmailExist = await prisma.user.findFirst({
          where: {
            email
          }
        });

        if (isEmailExist) {
          throw new Error('email is already register');
        } //hashed password


        password = await _bcrypt.default.hash(password, 10); //find role id for given role name

        const roleid = await prisma.role.findFirst({
          where: {
            roleName
          },
          select: {
            id: true
          }
        });
        roleName = roleid.id; //save user in database  

        const savedUser = await prisma.user.create({
          data: {
            name,
            email,
            password,
            roleId: roleName
          }
        });
        return savedUser;
      } catch (e) {
        return e;
      }
    },

    async login(parent, {
      loginInput: {
        email,
        password
      }
    }, {
      prisma
    }, info) {
      //validate data
      const data = await _validate.default.validateLoginUser(email, password);

      try {
        //check for email is register or not
        const isUserExist = await prisma.user.findFirst({
          where: {
            email
          }
        });

        if (!isUserExist) {
          throw new Error('email is not registerd');
        } //check for password validation


        const isPasswordMtch = await (0, _verifyPassword.verifyPassword)(password, isUserExist.password);

        if (!isPasswordMtch) {
          throw new Error('email/password is wrong');
        } //generate access token


        const accessToken = await (0, _jwt.signAccessToken)(isUserExist.id); //generate refresh token

        const refreshToken = await (0, _jwt.signReferesToken)(isUserExist.id);
        const roleId = isUserExist.roleId;
        const userId = isUserExist.id;
        return {
          accessToken,
          refreshToken,
          roleId,
          userId
        };
      } catch (error) {
        return error;
      }
    },

    //forgot password
    async forgotPassword(parent, {
      email
    }, context, info) {
      //verify token
      try {
        //cheack for email is register or not
        const isUserExist = await context.prisma.user.findFirst({
          where: {
            email
          }
        });

        if (!isUserExist) {
          throw new Error('email is not registerd');
        } //generate access token


        const accessToken = await (0, _jwt.signAccessToken)(isUserExist.id); //send mail 

        const data = await (0, _mail.mailSend)(isUserExist.email, accessToken);
        return "email send successfully";
      } catch (error) {
        return error;
      }
    },

    //reset password
    async resetPassword(parent, {
      token,
      password
    }, {
      prisma
    }, info) {
      //verify token
      try {
        //check for valid user
        const user = await (0, _jwt.decodeToken)(token);
        password = await _bcrypt.default.hash(password, 10); //update password with new password

        const updateUser = await prisma.user.update({
          where: {
            id: user.aud
          },
          data: {
            password
          }
        });
        return "password reset successfull";
      } catch (error) {
        return error;
      }
    },

    //refreshtoken validation and generate new tokens
    async refreshToken(parent, {
      token
    }, context, info) {
      try {
        // verify refresh token
        const userId = await (0, _jwt.veifyRefreshToken)(token); //generate new access token

        console.log(userId);
        const accToken = await (0, _jwt.signAccessToken)(userId); //generate new refresh token

        const refToken = await (0, _jwt.signReferesToken)(userId); // throw new Error("not valid")

        return {
          accToken,
          refToken
        };
      } catch (error) {
        return error;
      }
    }

  }
};
exports.default = _default;