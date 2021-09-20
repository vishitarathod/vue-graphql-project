import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import { PrismaClient } from '@prisma/client';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import express from 'express';
import http from 'http';
import typeDefs from './schema.js'
import resolvers from './resolvers/index.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
// async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req,prisma}),
    // context:{prisma},
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }

// startApolloServer('./src/schema.graphql',resolvers)