"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jwPaginate = _interopRequireDefault(require("jw-paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { verifyAccessToken} from '../helper/jwt.js'
var _default = {
  Query: {
    //get perticular post for edit
    async getPostForEdit(parent, {
      id
    }, context, info) {
      try {
        const post = await context.prisma.post.findUnique({
          where: {
            id
          },
          select: {
            title: true,
            discription: true
          }
        });
        return post;
      } catch (error) {
        return console.error();
      }
    },

    //get post for perticular user
    async getUserPost(parent, {
      page,
      userId
    }, context, info) {
      try {
        const items = await context.prisma.post.findMany({
          where: {
            userId
          }
        }); // get page from query params or default to first page

        const page1 = parseInt(page) || 1; // get pager object for specified page

        const pageSize = 4;
        const pager = (0, _jwPaginate.default)(items.length, page1, pageSize); // get page of items from items array

        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1); // return pager object and current page of items

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
    },

    //get total post
    async getPost(parent, {
      page
    }, context, info) {
      try {
        const items = await context.prisma.post.findMany(); // get page from query params or default to first page

        const page1 = parseInt(page) || 1; // get pager object for specified page

        const pageSize = 4;
        const pager = (0, _jwPaginate.default)(items.length, page1, pageSize); // get page of items from items array

        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1); // return pager object and current page of items

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
    // add post 
    async addPost(parent, {
      title,
      discription,
      userId
    }, context, info) {
      try {
        //save post
        const savedPost = await context.prisma.post.create({
          data: {
            userId,
            title,
            discription
          }
        });
        return "post added successfully";
      } catch (error) {
        return error;
      }
    },

    //delete post by id
    async deletePost(parent, {
      id
    }, context, info) {
      try {
        const deletedUser = await context.prisma.post.delete({
          where: {
            id
          }
        });
        return "post deleted successfully";
      } catch (error) {
        return error;
      }
    },

    //update post by id
    async updatePost(parent, {
      id,
      title,
      discription
    }, context, info) {
      try {
        const updateUser = await context.prisma.post.update({
          where: {
            id
          },
          data: {
            title,
            discription
          }
        });
        return "post update sucessfully";
      } catch (error) {
        return error;
      }
    }

  }
};
exports.default = _default;