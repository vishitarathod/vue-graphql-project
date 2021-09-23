import { gql } from "apollo-server-core"

 const typeDefs=gql`
   type Query{
     hello:String!
      logout:String!
      getPostForEdit(id:String!):Post!
      getUserForEdit(id:String!):GetUser!
      getPermission(resourceName:String!):Permission!
      getUsers(page:Int!):[String!]!
      getUserPost(page:Int!):String!
      getPost(page:Int!):String!
    }
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
   type User{
     id:String!
     name:String!
     email:String!
     password:String!
     roleId:String!
   }
   type GetUser{
    name:String!
    email:String!
    password:String!
   }
   type RefsToken{
     accToken:String!
     refToken:String!
   }
   input UpdateUserInput{
      id:String!
      name:String
      email:String
      password:String
   }
   type Post{
    title:String!
    discription:String!
   }
   type Permission{
     read:Boolean!
     write:Boolean!
     update:Boolean!
     delete:Boolean!
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
     addPost(title:String!,discription:String!):Post!
     deletePost(id:String!):String!
     updatePost(id:String!,title:String!,discription:String!):String!
   }
 `
 export default typeDefs