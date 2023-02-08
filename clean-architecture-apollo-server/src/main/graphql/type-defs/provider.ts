import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    listProviders: [User!] @auth

    providerDayAvailability(
      year: String!
      month: String!
      day: String!
    ): [ProviderDayAvailability!] @auth

    providerMonthAvailability(
      year: String!
      month: String!
    ): [ProviderMonthAvailability!] @auth
  }

  type User {
    name: String!
    email: String!
    password: String!
    avatar: String
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }

  type ProviderDayAvailability {
    hour: Float!
    available: Boolean!
  }

  type ProviderMonthAvailability {
    day: Float!
    available: Boolean!
  }
`;
