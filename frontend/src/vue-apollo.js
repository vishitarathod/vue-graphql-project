import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import { setContext } from 'apollo-link-context'
import { onError } from "apollo-link-error";
import gql from 'graphql-tag'
import {HttpLink} from 'apollo-link-http'
import { fromPromise } from "apollo-link";
import router from './router';
// Install the vue plugin
Vue.use(VueApollo)


const jwtaccesstoken = 'jwtaccesstoken'
const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'})

 function getNewToken() {
  const token=localStorage.getItem('jwtrefreshtoken');
  return apolloClient.mutate({
    mutation: gql`mutation ($token: String!) {
        refreshToken(token:$token)
        {
          accToken
          refToken
        }
    }`,
    // Parameters
    variables: {
      token
    },
  }).then((response) => {
    console.log(response)
    // extract your accessToken and refreshToken from your response data and return it
    localStorage.setItem("jwtaccesstoken",response.data.refreshToken.accToken)
    localStorage.setItem("jwtrefreshtoken",response.data.refreshToken.refToken)
    const accessToken   = response.data.refreshToken.accToken;
    return accessToken;
  })
}

const errlink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            return fromPromise(
              getNewToken().catch(() => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("jwtaccesstoken");
                localStorage.removeItem("jwtrefreshtoken");
                localStorage.removeItem("roleId");
                localStorage.removeItem("userId");
                return router.push('/login');
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                // const oldHeaders = operation.getContext().headers;
                console.log(accessToken)
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    // ...oldHeaders,
                    Authorization: `Bearer ${accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              });
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);

  }
);
const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  }
})
const defaultOptions = {
  wsEndpoint: null,
  tokenName: jwtaccesstoken,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  link: errlink.concat(authLink).concat(httpLink),

}

export const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions
})
apolloClient.wsClient = wsClient

export function createProvider () {
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: 'cache-and-network'
      }
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })
  return apolloProvider
}

