import UserAvatarController from '@controllers/users/UserAvatarController';
import { adaptResolver } from '../../config/apollo-server-resolver-adapter';

export default {
  Mutation: {
    updateAvatar: async (parent: any, args: any, context: any) =>
      adaptResolver(new UserAvatarController(), args, context),
  },
};
