const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require('faunadb')
const q = faunadb.query;

const client = new faunadb.Client({secret: process.env.FAUNA })

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

let eventIndex = 0;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    events: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        await client.query(
          q.Paginate(q.Match(q.Index("all_events")))
        );
        return results.data.map(([ref, title, date, url]) => ({
          id: ref.id,
          title,
          date,
          url
        }));
      }
    }
  },
  Mutation: {
    addEvent: async (_, { title, url, date }) => {
      const results = await client.query(
        q.Create(q.Collection("tech-events"), {
          data: {
            title,
            date,
            url
          }
        })
      )
      return {
        ...results.data,
        id: results.ref.id
      }
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
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});