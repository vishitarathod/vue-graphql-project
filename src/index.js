import { ApolloServer } from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { rule, shield, and, or, not, allow } from 'graphql-shield'
import { buildFederatedSchema } from '@apollo/federation';
import express from 'express';
import http from 'http';
import typeDefs from './schema.js'
import resolvers from './resolvers/index.js';
import pkg from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import {permission}  from './rule.js';
const { PrismaClient } = pkg;
// import per from './rule.js';
  const prisma = new PrismaClient();
  const app = express();

  // const schema = makeExecutableSchema({ typeDefs, resolvers })

// const schemaWithMiddleware = applyMiddleware(
//   schema,
//   shield({})
// )
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    // schema: applyMiddleware(
    //   buildFederatedSchema([{ typeDefs, resolvers }]),
    //   permission
    // ),
    // schema:applyMiddleware(schema,permission),
    // mocks: false,
    // schema: schemaWithMiddleware,
    typeDefs,
    resolvers,
    context:({req})=>({req,prisma}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);