import gql from 'graphql-tag'
import {apolloClient} from '../vue-apollo'

export default{
    async registerApi(_, payload) {
      try {
        const data= await apolloClient.mutate({
          // Query
          mutation: gql`mutation ($registerInput: RegisterInput) {
              register(registerInput:$registerInput)
              {
                      id
                      name
                      email
                      password
                      roleId
              }
          }`,
          // Parameters
          variables: {
            registerInput:{
            name:payload.name,
            email:payload.email,
            password: payload.password,
            roleName:payload.roleId
            }
          },
        })
        console.log(data)
      } catch (error) {
        console.log("error")
        throw error.message.split(': ')[1];
      }
  

    }
}