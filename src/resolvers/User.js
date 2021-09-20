import bcrypt from 'bcrypt'
import { verifyAccessToken} from '../helper/jwt.js'
export default {
    Mutation:{
       async addUser(parent,{registerInput:{name,email,password,roleName}},context,info){
        const data= await verifyAccessToken(context)
        try {
            //cheack for email is alreday register or not
            const isEmailExist= await context.prisma.user.findFirst({
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
            const roleid=  await context.prisma.role.findFirst({
                where: {
                  roleName,
                },
                select: {
                    id: true,
                  },
              })
              roleName=roleid.id;

            //save user in database  
            const savedUser=  await context.prisma.user.create({
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
       async deleteUser(parent,{id},context,info){
           try {
            const deletedUser = await context.prisma.user.delete({
                where: {
                  id,
                },
              })
            //   console.log(deletedUser)
            return "user deleted successfully"
           } catch (error) {
               return error
           }
          
        },

        async updateUser(parent,{updateUserInput:{id,name,email,password}},context,info){
            try {
                const updateUser = await context.prisma.user.update({
                    where: {
                      id, 
                    },
                    data: {
                      name,
                      email,
                      password
                    },
                  })
                  return "user update sucessfully"
            } catch (error) {
                return error
            }
        },
    }
}