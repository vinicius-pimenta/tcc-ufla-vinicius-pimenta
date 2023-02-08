import ProviderDayAvailabilityController from '@controllers/appointments/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@controllers/appointments/ProviderMonthAvailabilityController';
import ProvidersController from '@controllers/appointments/ProvidersController';
import { adaptResolver } from '../../config/apollo-server-resolver-adapter';

export default {
  Query: {
    listProviders: async (parent: any, args: any, context: any) =>
      adaptResolver(new ProvidersController(), args, context),

    providerDayAvailability: async (parent: any, args: any, context: any) =>
      adaptResolver(new ProviderDayAvailabilityController(), args, context),

    providerMonthAvailability: async (parent: any, args: any, context: any) =>
      adaptResolver(new ProviderMonthAvailabilityController(), args, context),
  },
};
