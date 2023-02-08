import { gql } from 'apollo-server';

export default gql`
  scalar GraphQLDateTime
  scalar Upload

  directive @auth on FIELD_DEFINITION

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
