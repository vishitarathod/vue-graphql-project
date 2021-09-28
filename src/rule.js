import { rule, shield, and, or} from 'graphql-shield'
import JWT from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-errors';
 const rules={
    isAuthenticated : rule({ cache: 'contextual' })(
        async (parent, args, context, info) => {
          console.log("is authenticated....")

        const header = context.req.get('Authorization')
          if (header) {
            // console.log("heyy")
          const token = header.split('Bearer ')[1];
          if(token){
              try {
                // console.log("hey")
                  const decoded= JWT.verify(token, process.env.secret)
                   context.userId=decoded.aud
                  //  console.log(context.userId)
                  return true
              } catch (error) {
                return new ApolloError('Invalid/Expired token','UNAUTHENTICATED');
              }
           }
              return new Error('Authentication required')
          }
          return new Error('Authentication header must be provided')
        },
 ),
  isAdmin:rule({cache: 'contextual'})(
    async (parent, args, context, info) => {
      const userId=context.userId
      const user=await context.prisma.user.findFirst({
        where:{
          id:userId
      },
      select:{
        roleId:true
      }
      })
      console.log(user);
      if(user.roleId==="3226d1a8-4cfa-4fcc-a34a-b08841a96d40")
      {
        return true
      }
      else{
        return new Error('you are not allowed to access this resource')
      }
    }
  ),
  isSuperAdmin:rule({cache: 'contextual'})(
    async (parent, args, context, info) => {
      const userId=context.userId
      const user=await context.prisma.user.findFirst({
        where:{
          id:userId
      },
      select:{
        roleId:true
      }
      })
      console.log(user);
      if(user.roleId==="6c1f0d1a-23ac-4a9a-ab5c-f68ed0d46e39")
      {
        return true
      }
      else{
        return new Error('you are not allowed to access this resource')
      }
    }
  ),
  isUser:rule({cache: 'contextual'})(
    async (parent, args, context, info) => {
      const userId=context.userId
      const user=await context.prisma.user.findFirst({
        where:{
          id:userId
      },
      select:{
        roleId:true
      }
      })
      console.log(user);
      if(user.roleId==="ac916b69-c475-4b2f-bf69-a4066ff12e62")
      {
        return true
      }
      else{
        return new Error('you are not allowed to access this resource')
      }
    }
  ),
}
 export const permission=shield({
    Query: {
      getPostForEdit:and(rules.isAuthenticated,rules.isUser),
      getUserForEdit:and(rules.isAuthenticated,rules.isSuperAdmin),
      getPermission:rules.isAuthenticated,
      getUserPost:and(rules.isAuthenticated,rules.isUser),
      getPost:and(rules.isAuthenticated,rules.isSuperAdmin),
      getUsers:and(rules.isAuthenticated, or(rules.isSuperAdmin, rules.isAdmin))
    },
    Mutation:{
      // refreshToken:rules.isAuthenticated,
      addUser:and(rules.isAuthenticated,rules.isSuperAdmin),
      deleteUser:and(rules.isAuthenticated,rules.isSuperAdmin),
      updateUser:and(rules.isAuthenticated,rules.isSuperAdmin),
      addPost:and(rules.isAuthenticated,rules.isUser),
      deletePost:and(rules.isAuthenticated, or(rules.isSuperAdmin,rules.isUser)),
      updatePost:and(rules.isAuthenticated,rules.isUser),
    }
  })