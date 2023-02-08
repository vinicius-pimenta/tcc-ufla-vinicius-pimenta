import AppointmentsController from '@controllers/appointments/AppointmentsController';
import ProviderAppointmentsController from '@controllers/appointments/ProviderAppointmentsController';
import { adaptResolver } from '../../config/apollo-server-resolver-adapter';

export default {
  Query: {
    listProviderAppointments: async (parent: any, args: any, context: any) =>
      adaptResolver(new ProviderAppointmentsController(), args, context),
  },

  Mutation: {
    appointment: async (parent: any, args: any, context: any) =>
      adaptResolver(new AppointmentsController(), args, context),
  },
};
