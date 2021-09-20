 const typeDefs=
 `
   type Query{
      logout:String!
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
   type AddPost{
    title:String!
    discription:String!
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
     addPost(title:String!,discription:String!):AddPost
   }
 `
 export default typeDefs