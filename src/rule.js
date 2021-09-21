import { rule, shield, and, or, not, allow } from 'graphql-shield'
import JWT from 'jsonwebtoken'
export const rules={
    isAuthenticated : rule({ cache: 'contextual' })(
        async (parent, args, ctx, info) => {
        //   return ctx.user !== null
    
        //   const header = ctx.req.headers.authorization
        const header = ctx.req.get('Authorization')
    
          // console.log(header)
          if (header) {
          const token = header.split('Bearer ')[1];
          if(token){
              try {
                  const decoded = JWT.verify(token, process.env.secret)
                  return decoded
              } catch (error) {
                  throw new Error('Invalid/Expired token')
              }
           }
              throw new Error('Authentication required')
          }
      
          throw new Error('Authentication header must be provided')
        },
 )
}


  export const permission=shield({
    Query: {},
    // Query: allow,
    Mutation:{
        // deleteUser:rules.isAuthenticated,
    }
  }
  )
   
  