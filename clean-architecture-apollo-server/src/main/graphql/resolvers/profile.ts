import { adaptResolver } from '@main/config/apollo-server-resolver-adapter';
import { makeShowUserController } from '@main/factories/show-user-controller';

export default {
  Query: {
    profile: async (parent: any, args: any, context: any) =>
      adaptResolver(makeShowUserController(), args, context),
  },
};
