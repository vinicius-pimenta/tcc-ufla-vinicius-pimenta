import { adaptResolver } from '@main/config/apollo-server-resolver-adapter';
import { makeCreateAppointmentsController } from '@main/factories/create-appointments-controller';
import { makeListProviderAppointmentsController } from '@main/factories/list-provider-appointments-controller';

export default {
  Query: {
    listProviderAppointments: async (parent: any, args: any, context: any) =>
      adaptResolver(makeListProviderAppointmentsController(), args, context),
  },

  Mutation: {
    appointment: async (parent: any, args: any, context: any) =>
      adaptResolver(makeCreateAppointmentsController(), args, context),
  },
};
