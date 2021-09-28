"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permission = void 0;

var _graphqlShield = require("graphql-shield");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _apolloServerErrors = require("apollo-server-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rules = {
  isAuthenticated: (0, _graphqlShield.rule)({
    cache: 'contextual'
  })(async (parent, args, context, info) => {
    console.log("is authenticated....");
    const header = context.req.get('Authorization');

    if (header) {
      // console.log("heyy")
      const token = header.split('Bearer ')[1];

      if (token) {
        try {
          // console.log("hey")
          const decoded = _jsonwebtoken.default.verify(token, process.env.secret);

          context.userId = decoded.aud; //  console.log(context.userId)

          return true;
        } catch (error) {
          return new _apolloServerErrors.ApolloError('Invalid/Expired token', 'UNAUTHENTICATED');
        }
      }

      return new Error('Authentication required');
    }

    return new Error('Authentication header must be provided');
  }),
  isAdmin: (0, _graphqlShield.rule)({
    cache: 'contextual'
  })(async (parent, args, context, info) => {
    const userId = context.userId;
    const user = await context.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        roleId: true
      }
    });
    console.log(user);

    if (user.roleId === "3226d1a8-4cfa-4fcc-a34a-b08841a96d40") {
      return true;
    } else {
      return new Error('you are not allowed to access this resource');
    }
  }),
  isSuperAdmin: (0, _graphqlShield.rule)({
    cache: 'contextual'
  })(async (parent, args, context, info) => {
    const userId = context.userId;
    const user = await context.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        roleId: true
      }
    });
    console.log(user);

    if (user.roleId === "6c1f0d1a-23ac-4a9a-ab5c-f68ed0d46e39") {
      return true;
    } else {
      return new Error('you are not allowed to access this resource');
    }
  }),
  isUser: (0, _graphqlShield.rule)({
    cache: 'contextual'
  })(async (parent, args, context, info) => {
    const userId = context.userId;
    const user = await context.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        roleId: true
      }
    });
    console.log(user);

    if (user.roleId === "ac916b69-c475-4b2f-bf69-a4066ff12e62") {
      return true;
    } else {
      return new Error('you are not allowed to access this resource');
    }
  })
};
const permission = (0, _graphqlShield.shield)({
  Query: {
    getPostForEdit: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isUser),
    getUserForEdit: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isSuperAdmin),
    getPermission: rules.isAuthenticated,
    getUserPost: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isUser),
    getPost: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isSuperAdmin),
    getUsers: (0, _graphqlShield.and)(rules.isAuthenticated, (0, _graphqlShield.or)(rules.isSuperAdmin, rules.isAdmin))
  },
  Mutation: {
    // refreshToken:rules.isAuthenticated,
    addUser: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isSuperAdmin),
    deleteUser: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isSuperAdmin),
    updateUser: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isSuperAdmin),
    addPost: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isUser),
    deletePost: (0, _graphqlShield.and)(rules.isAuthenticated, (0, _graphqlShield.or)(rules.isSuperAdmin, rules.isUser)),
    updatePost: (0, _graphqlShield.and)(rules.isAuthenticated, rules.isUser)
  }
});
exports.permission = permission;