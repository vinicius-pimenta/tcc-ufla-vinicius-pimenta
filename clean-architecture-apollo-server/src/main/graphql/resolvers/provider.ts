import { adaptResolver } from '@main/config/apollo-server-resolver-adapter';
import { makeListProviderDayAvailabilityController } from '@main/factories/list-provider-day-availability-controller';
import { makeListProviderMonthAvailabilityController } from '@main/factories/list-provider-month-availability-controller';
import { makeListProvidersController } from '@main/factories/list-providers-controller';

export default {
  Query: {
    listProviders: async (parent: any, args: any, context: any) =>
      adaptResolver(makeListProvidersController(), args, context),

    providerDayAvailability: async (parent: any, args: any, context: any) =>
      adaptResolver(makeListProviderDayAvailabilityController(), args, context),

    providerMonthAvailability: async (parent: any, args: any, context: any) =>
      adaptResolver(
        makeListProviderMonthAvailabilityController(),
        args,
        context,
      ),
  },
};
