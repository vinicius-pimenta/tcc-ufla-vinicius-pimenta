import ProfileController from '@controllers/users/ProfileController';
import { adaptResolver } from '../../config/apollo-server-resolver-adapter';

export default {
  Query: {
    profile: async (parent: any, args: any, context: any) =>
      adaptResolver(new ProfileController(), args, context),
  },
};
