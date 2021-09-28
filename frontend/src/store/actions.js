import gql from 'graphql-tag'
import {apolloClient} from '../vue-apollo'

export default{
    async registerApi({commit}, payload) {
      try {
        const response= await apolloClient.mutate({
    
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
        if(response&&response.data){
          commit('setLoading',false)
        }
      } catch (error) {
        commit('setLoading',false)
        throw error.message.split(': ')[1];
      }
    },

    async loginApi({commit}, payload) {
      try{
        const response= await apolloClient.mutate({
    
          mutation: gql`mutation ($loginInput: LoginInput) {
              login(loginInput:$loginInput)
              {
                accessToken
                refreshToken
                roleId
                userId
              }
          }`,
          // Parameters
          variables: {
            loginInput:{
            email:payload.email,
            password: payload.password
            }
          },
        })
      
        if (response && response.data) {
          commit("setLoginApiStatus", true);
          localStorage.setItem("roleId",response.data.login.roleId)
          localStorage.setItem("userId",response.data.login.userId)
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("jwtaccesstoken",response.data.login.accessToken)
          localStorage.setItem("jwtrefreshtoken",response.data.login.refreshToken)
        } else {
          commit("setLoginApiStatus", false);
          
        }
      }catch (error) {
          throw error.message.split(': ')[1];
      }
     
      },

      async userLogout(){
         localStorage.removeItem("isAuthenticated");
         localStorage.removeItem("jwtaccesstoken");
         localStorage.removeItem("jwtrefreshtoken");
         localStorage.removeItem("roleId");
         localStorage.removeItem("userId");
       },
}