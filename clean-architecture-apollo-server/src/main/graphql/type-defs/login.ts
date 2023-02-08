import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    login(email: String!, password: String!): Account!
  }

  extend type Mutation {
    signup(name: String!, email: String!, password: String!): Signup!

    forgotPassword(email: String!): ID @auth

    reset(
      name: String!
      email: String!
      password: String!
      oldPassword: String!
    ): ID @auth
  }

  type Account {
    user: User!
    token: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
    avatar: String
  }

  type Signup {
    id: ID!
    email: String!
    name: String!
    avatar: String
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
