import axios from 'axios'
import jwtInterceptor from '../shared/jwt.interceptor.js'
export default{
  async loginApi({commit}, payload) {
    try{
      console.log("payload.......",payload)
      const response = await jwtInterceptor
      .post("auth/login",payload)
      console.log("================",response.data)
      if (response && response.data) {
        commit("setLoginApiStatus", true);
        // commit("setLogout",false);
        // commit("setRoleName",response.data.roles)
        // commit("setUserID",response.data.userID)
        localStorage.setItem("roleId",response.data.roleId)
        localStorage.setItem("userId",response.data.userId)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("jwtaccesstoken",response.data.accessToken)
        localStorage.setItem("jwtrefreshtoken",response.data.refreshToken)
      } else {
        commit("setLoginApiStatus", false);
        
      }
    }catch (error) {
      console.log(error.response)
        throw error
    }
   
    },

    async userLogout({commit}){
      const response = await jwtInterceptor
       .get("auth/logout")
       .catch((err) => {
       console.log(err);
       });
     
       if(response && response.data){
       localStorage.removeItem("isAuthenticated");
       localStorage.removeItem("jwtaccesstoken");
       localStorage.removeItem("jwtrefreshtoken");
      //  localStorage.removeItem("roles");
      //  localStorage.removeItem("userID");
       }
       else{
       commit("setLogout", false)
       }
     },

     async registerApi(_, payload) {
      try {
          // console.log('before.....')
        const response = await axios
        .post("http://localhost:3000/auth/register",payload)
        console.log("+++++++++++",response)
        // console.log(response.data)
      } catch (error) {
        console.log(error.response)
          throw error
      }
    }
}