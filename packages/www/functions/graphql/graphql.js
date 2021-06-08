const { ApolloServer, gql } = require("apollo-server-lambda");
const { GraphQLScalarType, Kind} = require('graphql');
const moment = require('moment')
const { GraphQLDateTime } = require('graphql-iso-date')
const faunadb = require('faunadb')
const q = faunadb.query;

const client = new faunadb.Client({secret: process.env.FAUNA })

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Query {
    events: [Event]!
  }
  type Event {
    id: ID!
    date: Date!
    title: String!
    url: String!
    type: String!
  }
  type Mutation {
    addEvent(title: String!, url: String!, date: Date!, type: String!): Event
    deleteEvent(id: ID!): Boolean
  }
`;

// const dateScalar = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     return moment(value).format("DD-MM-YYYY") // Convert outgoing Date to integer for JSON
//   },
//   parseValue(value) {
//     return moment(value); // Convert incoming integer to Date
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
//     }
//     return null; // Invalid hard-coded value (not an integer)
//   },
// });
// Provide resolver functions for your schema fields
const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    events: async (parent, args, { user }) => {
        const results = await client.query(
          q.Paginate(q.Match(q.Index("all_events")))
        );
        console.log('results', results);
        return results.data.map(([ref, title, date, url, type]) => ({
          id: ref.id,
          title,
          date,
          url,
          type
        }));
    }
  },
  Mutation: {
    addEvent: async (_, { title, url, date, type }) => {
      const results = await client.query(
        q.Create(q.Collection("tech-events"), {
          data: {
            title,
            date,
            url,
            type
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