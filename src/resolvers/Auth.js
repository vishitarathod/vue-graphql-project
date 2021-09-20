import bcrypt from 'bcrypt'
import { verifyPassword } from '../helper/verifyPassword.js'
import { decodeToken, signAccessToken ,signReferesToken ,verifyAccessToken, veifyRefreshToken} from '../helper/jwt.js'
import { mailSend } from '../helper/mail.js'

export default{
    Query:{
        logout(){
            return "logout successfully"
        }
    },
    Mutation:{
        //user registration
       async register(parent,{registerInput:{name,email,password,roleName}},{prisma},info){
           try {
            //cheack for email is alreday register or not
            const isEmailExist= await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(isEmailExist){
                throw new Error('email is already register')
            }

            //hashed password
            password=await bcrypt.hash(password,10);

            //find role id for given role name
            const roleid=  await prisma.role.findFirst({
                where: {
                  roleName,
                },
                select: {
                    id: true,
                  },
              })
              roleName=roleid.id;

            //save user in database  
            const savedUser=  await prisma.user.create({
                 data: {
                     name,
                     email,
                     password,
                     roleId:roleName
                   },
               })
             return savedUser;
           } catch (e) {
               return e
           }
        },

        async login(parent,{loginInput:{email,password}},{prisma},info){
            try {
            //check for email is register or not
            const isUserExist= await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(!isUserExist){
                throw new Error('email is not registerd')
            }
            //check for password validation
           const isPasswordMtch= await verifyPassword(password,isUserExist.password)
           if(!isPasswordMtch){
            throw new Error('email/password is wrong')
           }
            //generate access token
            const accessToken=await signAccessToken(isUserExist.id)
        
             //generate refresh token
            const refreshToken=await signReferesToken(isUserExist.id)

            const roleId=isUserExist.roleId
            const userId=isUserExist.id
            return{
                accessToken,
                refreshToken,
                roleId,
                userId   
            }
            } catch (error) {
                return error
            }
        },
        //forgot password
        async forgotPassword(parent,{email},{prisma},info){
            try {
            //cheack for email is register or not
            const isUserExist= await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(!isUserExist){
                throw new Error('email is not registerd')
            }

             //generate access token
             const accessToken=await signAccessToken(isUserExist.id)

             //send mail 
            const data= await mailSend(isUserExist.email,accessToken)
            return "email send successfully"

            } catch (error) {
                return error
            }
        },
        //reset password
        async resetPassword(parent,{token,password},{prisma},info){
            try {
                //check for valid user
                const user=await decodeToken(token)
                password= password=await bcrypt.hash(password,10);

                //update password with new password
                const updateUser = await prisma.user.update({
                    where: {
                      id: user.aud,
                    },
                    data: {
                      password,
                    },
                  })
                  return "password reset successfull"
            } catch (error) {
                return error
            }
        },

        //refreshtoken validation and generate new tokens
       async refreshToken(parent,{token},context,info){
            const data= await verifyAccessToken(context)
            try {
                //verify refresh token
                const userId=await veifyRefreshToken(token)
                //generate new access token
                const accToken=await signAccessToken(userId);
                //generate new refresh token
                const refToken=await signReferesToken(userId)
          
                return {accToken,refToken}
            } catch (error) {
                return error
            }
        }
    }
}