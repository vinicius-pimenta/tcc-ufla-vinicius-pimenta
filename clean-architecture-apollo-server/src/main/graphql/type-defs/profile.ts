import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    profile: User! @auth
  }

  extend type Mutation {
    profile(
      name: String
      email: String
      password: String
      oldPassword: String
    ): User! @auth
  }

  type User {
    id: String!
    name: String!
    email: String!
    avatar: String
  }
`;
