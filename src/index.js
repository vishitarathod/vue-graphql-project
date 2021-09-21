import { ApolloServer } from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import typeDefs from './schema.js'
import resolvers from './resolvers/index.js';
import pkg from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import { permission } from './rule.js';
const { PrismaClient } = pkg;

  const prisma = new PrismaClient();
  const app = express();
  const schema= makeExecutableSchema({typeDefs,resolvers})
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    // schema:applyMiddleware(schema,permission),
    typeDefs,
    resolvers,
    context:({req})=>({req,prisma}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app,permission });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);