import { adaptResolver } from '@main/config/apollo-server-resolver-adapter';
import { makeUpdateAvatarController } from '@main/factories/update-avatar-controller';

export default {
  Mutation: {
    updateAvatar: async (parent: any, args: any, context: any) =>
      adaptResolver(makeUpdateAvatarController(), args, context),
  },
};
