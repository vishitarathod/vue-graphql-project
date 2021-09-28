"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerCore = require("apollo-server-core");

const AuthType = (0, _apolloServerCore.gql)`
 input RegisterInput{
      name:String!
      email:String!
      password:String!
      roleName:String!
   }
   input LoginInput{
     email:String!
     password:String!
   }
   type LoginUser{
    accessToken:String!
    refreshToken:String!
    roleId:String!
    userId:String!
   }
   type RefsToken{
     accToken:String!
     refToken:String!
   }
 `;
const UserType = (0, _apolloServerCore.gql)`
  type User{
     id:String!
     name:String!
     email:String!
     password:String!
     roleId:String
   }
   type GetUser{
    name:String!
    email:String!
    password:String!
   }
   input UpdateUserInput{
      id:String!
      name:String
      email:String
      password:String
   }
   type AllUser{
      currentpage:Int
      totalpages:Int
      pageOfItems:[User]
   }
   type Permission{
     read:Boolean!
     write:Boolean!
     update:Boolean!
     delete:Boolean!
   }
 `;
const PostType = (0, _apolloServerCore.gql)`
    type Post{
    id:String
    title:String!
    discription:String!
   }
   type AllUserPost{
    currentpage:Int
    totalpages:Int
    pageOfItems:[Post]
   }
  `;
const typeDefs = (0, _apolloServerCore.gql)`
    ${AuthType}
    ${UserType}
    ${PostType}
   type Query{
      getPostForEdit(id:String!):Post!
      getUserForEdit(id:String!):GetUser!
      getPermission(resourceName:String!,userId:String!):Permission!
      getUsers(page:Int!):AllUser
      getUserPost(page:Int!,userId:String!):AllUserPost
      getPost(page:Int!):AllUserPost
    }
   type Mutation{
     register(registerInput:RegisterInput):User!
     login(loginInput:LoginInput):LoginUser!
     forgotPassword(email:String!):String!
     resetPassword(token:String!,password:String!):String!
     refreshToken(token:String!):RefsToken!
     addUser(registerInput:RegisterInput):User!
     deleteUser(id:String!):String!
     updateUser(updateUserInput:UpdateUserInput):String!
     addPost(title:String!,discription:String!,userId:String!):String!
     deletePost(id:String!):String!
     updatePost(id:String!,title:String!,discription:String!):String!
   }
 `;
var _default = typeDefs;
exports.default = _default;