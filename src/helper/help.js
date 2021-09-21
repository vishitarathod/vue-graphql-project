// // import pkg from 'jsonwebtoken';
// import JWT from 'jsonwebtoken'
// import pkg1 from '@prisma/client';
// // const { verify } = pkg;
// const { PrismaClient } = pkg1;

//   const prisma = new PrismaClient();
// export const createContext=(ctx)=>{
//     // let userId;
//     // try {
//     //     let Authorization='';
//     //     try {
//     //         Authorization=ctx.req.get('Authorization')
//     //     } catch (error) {
//     //         Authorization=ctx?.connection?.context?.Authorization
//     //     }
//     //     const token=Authorization.replace('Bearer ','')
//     //     console.log(token)
//     //     const verifiedToken=verify(token,process.env.secret)
//     //     console.log(verifiedToken)
//     //     if(!verifiedToken.userId)
//     //         userId='-1';
//     //     else
//     //         userId=verifiedToken.userId
//     // } catch (error) {
//     //     userId='-1';
//     // }
//     const header = ctx.req.get('Authorization')
//     let userId;
//     // console.log(header)
//     if (header) {
//     const token = header.split('Bearer ')[1];
//     console.log(token)
//     if(token){
//         try {

//            const decoded = JWT.verify(token, process.env.secret)
//            userId=decoded.aud
//              console.log("++++++++",userId)
//             // return userId
//         } catch (error) {
//             throw new Error('Invalid/Expired token')
//         }
//      }
//         throw new Error('Authentication required')
//     }

//     // throw new Error('Authentication header must be provided')
//     return {
//         ...ctx,
//         prisma,
//         userId
//     }
// }