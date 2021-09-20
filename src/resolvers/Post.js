import { verifyAccessToken} from '../helper/jwt.js'
export default{
    Mutation:{
        async addPost(parent,{title,discription},context,info){
          const data= await verifyAccessToken(context);
          console.log(data.aud);
          try {
            const savedPost = await context.prisma.post.create({
                data: {
                  userId:data.aud,
                  title,
                  discription
                },
              })
              return savedPost
          } catch (error) {
              return error
          }

        }
    }
}