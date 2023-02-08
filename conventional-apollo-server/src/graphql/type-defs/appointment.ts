import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    listProviderAppointments(
      day: String!
      month: String!
      year: String!
    ): [Appointment]! @auth
  }

  extend type Mutation {
    appointment(providerId: String!, date: String!): Appointment! @auth
  }

  type Appointment {
    providerId: String!
    userId: String!
    date: GraphQLDateTime!
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
  }
`;
