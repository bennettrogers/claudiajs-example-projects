/*
 * schema.js
 * GraphQL schema definition
 */
'use strict';

const dataStore = require('./dataStore');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userid: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    age: {type: GraphQLInt}
  }
});

// RootQuery
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'query users',
  fields: {
    user: {
      type: new GraphQLList(UserType),
      args: {
        userid: {type: GraphQLString}
      },
      resolve: (source, args) => dataStore.getUser(args.userid)
    }
  }
});

// RootMutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation of the users',
  fields: {
    addUser: {
      type: UserType,
      args: {
        userid: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt}
      },
      resolve: (source, args) => dataStore.addUser(args)
    },
    deleteUser: {
      type: UserType,
      args: {
        userid: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (source, args) => dataStore.deleteUser(args.userid)
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
