// import { GraphQLServerLambda, PubSub } from 'graphql-yoga';
import { GraphQLServer, PubSub } from 'graphql-yoga';

import resolvers from './schema/resolvers';
import typeDefs from './schema/typeDefs';

const options = {
  endpoint: '/graphql',
  playground: '/graphiql',
  port: 3001
};

const pubsub = new PubSub();
const server = new GraphQLServer({
  context: req => ({
    ...req.request,
    pubsub
  }),
  resolvers,
  typeDefs
});

// exports.server = lambda.graphqlHandler;
// exports.playground = lambda.playgroundHandler;
server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
