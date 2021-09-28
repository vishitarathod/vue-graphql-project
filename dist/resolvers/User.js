"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwPaginate = _interopRequireDefault(require("jw-paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { verifyAccessToken} from '../helper/jwt.js'
var _default = {
  Query: {
    //get perticular post for edit
    async getUserForEdit(parent, {
      id
    }, context, info) {
      try {
        const user = await context.prisma.user.findUnique({
          where: {
            id
          },
          select: {
            name: true,
            email: true,
            password: true
          }
        });
        return user;
      } catch (error) {
        return error;
      }
    },

    //get permission 
    async getPermission(parent, {
      resourceName,
      userId
    }, context, info) {
      try {
        const user = await context.prisma.user.findFirst({
          where: {
            id: userId
          },
          select: {
            roleId: true
          }
        });
        const resourceId = await context.prisma.resource.findFirst({
          where: {
            resourceName
          },
          select: {
            id: true
          }
        });
        const permission = await context.prisma.permission.findFirst({
          where: {
            roleId: user.roleId,
            resourceId: resourceId.id
          },
          select: {
            read: true,
            write: true,
            delete: true,
            update: true
          }
        });
        return permission;
      } catch (error) {
        return error;
      }
    },

    //get users which have user role
    async getUsers(parent, {
      page
    }, context, info) {
      try {
        const items = await context.prisma.user.findMany({
          where: {
            roleId: "ac916b69-c475-4b2f-bf69-a4066ff12e62"
          }
        }); // get page from query params or default to first page

        const page1 = parseInt(page) || 1; // get pager object for specified page

        const pageSize = 2;
        const pager = (0, _jwPaginate.default)(items.length, page1, pageSize); // get page of items from items array

        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        const currentpage = pager.currentPage;
        const totalpages = pager.totalPages; // return pager object and current page of items

        return {
          currentpage,
          totalpages,
          pageOfItems
        };
      } catch (error) {
        return error;
      }
    }

  },
  Mutation: {
    async addUser(parent, {
      registerInput: {
        name,
        email,
        password,
        roleName
      }
    }, context, info) {
      try {
        //cheack for email is alreday register or not
        const isEmailExist = await context.prisma.user.findFirst({
          where: {
            email
          }
        });

        if (isEmailExist) {
          throw new Error('email is already register');
        } //hashed password


        password = await _bcrypt.default.hash(password, 10); //save user in database  

        const savedUser = await context.prisma.user.create({
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

    //delete user by id
    async deleteUser(parent, {
      id
    }, context, info) {
      try {
        const deletedUser = await context.prisma.user.delete({
          where: {
            id
          }
        }); //   console.log(deletedUser)

        return "user deleted successfully";
      } catch (error) {
        return error;
      }
    },

    //update user by id
    async updateUser(parent, {
      updateUserInput: {
        id,
        name,
        email,
        password
      }
    }, context, info) {
      try {
        const updateUser = await context.prisma.user.update({
          where: {
            id
          },
          data: {
            name,
            email,
            password
          }
        });
        return "user update sucessfully";
      } catch (error) {
        return error;
      }
    }

  }
};
exports.default = _default;