const { ApolloServer, gql } = require("apollo-server-lambda");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    events: [Event]!
  }
  type Event {
    id: ID!
    date: String!
    title: String!
    url: String!
  }
  type Mutation {
    addEvent(title: String!, url: String!, date: String!): Event
    deleteEvent(id: ID!): Boolean
  }
`;

const events = {};
let eventIndex = 0;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    events: () => {
      return Object.values(events);
    },
  },
  Mutation: {
    addEvent: (_, { title, url, date }) => {
      eventIndex++;
      const id = `key-${eventIndex}`;
      events[id] = { id, title, url, date};
      return events[id];
    },
    deleteEvent: (_, { id }) => {
      events[id] = null
      return true
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
//   context: ({ context }) => {
//     if (context.clientContext.user) {
//       return { user: context.clientContext.user.sub };
//     } else {
//       return {};
//     }
//   },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});