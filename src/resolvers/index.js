import userResolvers from './User.js'
import postResolvers from './Post.js'
import authResolvers from './Auth.js'

export default {
    Query:{
    //     // ...userResolvers.Query,
    //     // ...postResolvers.Query,
        ...authResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...authResolvers.Mutation
    }
}