import { gql } from 'apollo-server';

export default gql`
  extend type Mutation {
    updateAvatar(file: Upload!): User! @auth
  }

  type User {
    name: String!
    email: String!
    password: String!
    avatar: String
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
