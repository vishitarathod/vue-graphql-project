// // import axios from "axios";
// import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'

// // Install the vue plugin

// // Name of the localStorage item
// const jwtaccesstoken = 'apollo-token'

// // Http endpoint
// const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

// // Config
// const defaultOptions = {
//   // You can use `https` for secure connection (recommended in production)
//   httpEndpoint,
//   // You can use `wss` for secure connection (recommended in production)
//   // Use `null` to disable subscriptions
//   wsEndpoint: null,
//   // LocalStorage token
//   tokenName: jwtaccesstoken,
//   // Enable Automatic Query persisting with Apollo Engine
//   persisting: false,
//   // Use websockets for everything (no HTTP)
//   // You need to pass a `wsEndpoint` for this to work
//   websocketsOnly: false,
//   // Is being rendered on the server?
//   ssr: false,

//   // Override default apollo link
//   // note: don't override httpLink here, specify httpLink options in the
//   // httpLinkOptions property of defaultOptions.
//   // link: myLink

//   // Override default cache
//   // cache: myCache

//   // Override the way the Authorization header is set
//   // getAuth: (tokenName) => ...

//   // Additional ApolloClient options
//   // apollo: { ... }

//   // Client local data (see apollo-link-state)
//   // clientState: { resolvers: { ... }, defaults: { ... } }
// }
//  const { jwtInterceptor } = createApolloClient({
//   ...defaultOptions,
// })
// // const jwtInterceptor = axios.create({
// //   baseURL: 'http://localhost:3000',
// // });

// jwtInterceptor.interceptors.request.use((config) => {
//   const authToken=localStorage.getItem("jwtaccesstoken")
//   if (authToken) {
//   config.headers.Authorization = `Bearer ${authToken}`;
//   }
//   return config;
// });
 
// jwtInterceptor.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.response.config;
//     //if any error while generating refresh token
//     if (originalRequest.url === `http://localhost:3000/auth/refresh-token`) {
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("jwtaccesstoken");
//       localStorage.removeItem("jwtrefreshtoken");
//       localStorage.removeItem("roleId");
//       localStorage.removeItem("userId");
//       return Promise.reject(error);
//       }
      
//     if (error.response.status === 401&& !originalRequest._retry) {
//       originalRequest._retry = true;
//       var token=localStorage.getItem("jwtrefreshtoken")

//     return jwtInterceptor
//      .post("auth/refresh-token",{token})
//      .then((res)=> {
//        console.log(res.data)
//       localStorage.setItem("jwtaccesstoken",res.data.accToken)
//       localStorage.setItem("jwtrefreshtoken",res.data.refToken)
//       return jwtInterceptor(originalRequest);
//      }  
//      );
//     }else if(error.response.status === 401&& originalRequest._retry){
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("jwtaccesstoken");
//       localStorage.removeItem("jwtrefreshtoken");
//       localStorage.removeItem("roleId");
//       localStorage.removeItem("userId");
//       return Promise.reject(error);
//     }
//      else {
//       return Promise.reject(error);
//     }
//   }
// );
 
// export default jwtInterceptor;