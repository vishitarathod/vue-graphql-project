import { ApolloServer } from 'apollo-server-express';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import typeDefs from './schema.js'
import resolvers from './resolvers/index.js';
import { PrismaClient } from '@prisma/client';
import { applyMiddleware } from 'graphql-middleware';
import {permission}  from './rule.js';
const prisma = new PrismaClient();

async function startApolloServer(typeDefs, resolvers) {
  const schema= makeExecutableSchema({typeDefs,resolvers})
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema:applyMiddleware(schema,permission),
    typeDefs,
    resolvers,
    context:({req})=>({req,prisma}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs,resolvers);