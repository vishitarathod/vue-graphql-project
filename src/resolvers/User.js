import bcrypt from 'bcrypt'
import { verifyAccessToken} from '../helper/jwt.js'
import paginate from 'jw-paginate';
export default {
      Query:{
        //get perticular post for edit
        async getUserForEdit(parent,{id},context,info){
            //verify token
            const data= await verifyAccessToken(context)
            try {
              const user = await context.prisma.user.findUnique({
                where: {
                  id,
                },
                select:{
                    name:true,
                    email:true,
                    password:true
                }
              })
            return user
            } catch (error) {
              return error
            }
          
        },
        //get permission 
        async getPermission(parent,{resourceName},context,info){
          //verify token
          const data= await verifyAccessToken(context);
          try {
            const user=await context.prisma.user.findFirst({
              where:{
                id:data.aud
            },
            select:{
              roleId:true
            }
            })
            const resourceId=await context.prisma.resource.findFirst({
              where:{
                resourceName
            },
            select:{
              id:true
            }
            })
            const permission=await context.prisma.permission.findFirst({
              where:{
                roleId:user.roleId,
                resourceId:resourceId.id
            },
            select:{
              read:true,
              write:true,
              delete:true,
              update:true
            }
            })
            return permission

          } catch (error) {
            return error
          }
        },

        //get users which have user role
       async getUsers(parent,{page},context,info){
          //verify token
          const data= await verifyAccessToken(context)
         try {
          const items = await context.prisma.user.findMany({
            where: {
                roleId: "ac916b69-c475-4b2f-bf69-a4066ff12e62"
            },
          })
          // get page from query params or default to first page
          const page1 = parseInt(page) || 1;
        
          // get pager object for specified page
          const pageSize = 4;
          const pager = paginate(items.length, page1, pageSize);
        console.log(pager)
          // get page of items from items array
          const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
          console.log(pageOfItems)
          // return pager object and current page of items
          return { pager, pageOfItems };
         } catch (error) {
           return error
         }
          
  }
    },
    Mutation:{
       async addUser(parent,{registerInput:{name,email,password,roleName}},context,info){
        //verify token
        // const data= await verifyAccessToken(context)
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

        //delete user by id
       async deleteUser(parent,{id},context,info){
        //verify token
        // const data= await verifyAccessToken(context);
           try {
             console.log("__________________")
            console.log(context.userId);
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

        //update user by id
        async updateUser(parent,{updateUserInput:{id,name,email,password}},context,info){
          //verify token
          const data= await verifyAccessToken(context);
            try {
              console.log(context.userId);
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