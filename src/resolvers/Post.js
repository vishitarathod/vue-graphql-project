// import { verifyAccessToken} from '../helper/jwt.js'
import paginate from 'jw-paginate';
export default{
    Query:{
        //get perticular post for edit
        async getPostForEdit(parent,{id},context,info){
            //verify token
            // const data= await verifyAccessToken(context)
            try {
              const post = await context.prisma.post.findUnique({
                where: {
                  id,
                },
                select:{
                    title:true,
                    discription:true
                }
              })
            return post
            } catch (error) {
              return console.error();
            }
           
        },

        //get post for perticular user
        async getUserPost(parent,{page,userId},context,info){
          //verify token
          // const data= await verifyAccessToken(context);
          try {
            const items = await context.prisma.post.findMany({
              where: {
                  userId
              },
            })
            // get page from query params or default to first page
            const page1 = parseInt(page) || 1;
  
            // get pager object for specified page
            const pageSize = 4;
            const pager = paginate(items.length, page1, pageSize);
            
            // get page of items from items array
            const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
            // return pager object and current page of items
            const currentpage=pager.currentPage
            const totalpages=pager.totalPages
            // return pager object and current page of items
            return { currentpage, totalpages, pageOfItems };
          } catch (error) {
            return error
          }  
       },
        //get total post
        async getPost(parent,{page},context,info){
          //verify token
          // const data= await verifyAccessToken(context);
          try {
            const items = await context.prisma.post.findMany()
            // get page from query params or default to first page
            const page1 = parseInt(page) || 1;

            // get pager object for specified page
            const pageSize = 4;
            const pager = paginate(items.length, page1, pageSize);
            // get page of items from items array
            const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

            // return pager object and current page of items
            const currentpage=pager.currentPage
            const totalpages=pager.totalPages
            // return pager object and current page of items
            return { currentpage, totalpages, pageOfItems };
          } catch (error) {
            return error
          }
           
        }
    },
    Mutation:{
        // add post 
        async addPost(parent,{title,discription,userId},context,info){
        //verify token
          // const data= await verifyAccessToken(context);
          // console.log(data.aud);
          try {
            //save post
            const savedPost = await context.prisma.post.create({
                data: {
                  userId,
                  title,
                  discription
                },
              })
              return "post added successfully"
          } catch (error) {
              return error
          }
        },
        //delete post by id
       async deletePost(parent,{id},context,info){
            //verify token
            // const data= await verifyAccessToken(context);
            try {
             const deletedUser = await context.prisma.post.delete({
                 where: {
                   id,
                 },
               })
             return "post deleted successfully"
            } catch (error) {
                return error
            }
        },
         //update post by id
         async updatePost(parent,{id,title,discription},context,info){
            //verify token
            // const data= await verifyAccessToken(context);
              try {
                  const updateUser = await context.prisma.post.update({
                      where: {
                        id, 
                      },
                      data: {
                        title,
                        discription
                      },
                    })
                    return "post update sucessfully"
              } catch (error) {
                  return error
              }
          },
    }
}