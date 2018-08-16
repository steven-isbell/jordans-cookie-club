import { readFileSync } from 'fs';
import { GraphQLServer } from 'graphql-yoga';

const typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');
import resolvers from './schema/resolvers';

const options = {
  endpoint: '/graphql',
  playground: '/graphiql',
  port: 3001
};

const server = new GraphQLServer({
  context: req => ({
    ...req.request
  }),
  resolvers,
  typeDefs
});

server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
