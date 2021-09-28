"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerCore = require("apollo-server-core");

var _schema = require("@graphql-tools/schema");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _schema2 = _interopRequireDefault(require("./schema.js"));

var _index = _interopRequireDefault(require("./resolvers/index.js"));

var _client = require("@prisma/client");

var _graphqlMiddleware = require("graphql-middleware");

var _rule = require("./rule.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();

async function startApolloServer(typeDefs, resolvers) {
  const schema = (0, _schema.makeExecutableSchema)({
    typeDefs,
    resolvers
  });
  const app = (0, _express.default)();

  const httpServer = _http.default.createServer(app);

  const server = new _apolloServerExpress.ApolloServer({
    schema: (0, _graphqlMiddleware.applyMiddleware)(schema, _rule.permission),
    typeDefs,
    resolvers,
    context: ({
      req
    }) => ({
      req,
      prisma
    }),
    plugins: [(0, _apolloServerCore.ApolloServerPluginLandingPageGraphQLPlayground)({
      httpServer
    })]
  });
  await server.start();
  server.applyMiddleware({
    app
  });
  await new Promise(resolve => httpServer.listen({
    port: 4000
  }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(_schema2.default, _index.default);