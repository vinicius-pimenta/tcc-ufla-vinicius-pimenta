import { adaptResolver } from '@main/config/apollo-server-resolver-adapter';
import { makeAuthenticateUserController } from '@main/factories/authenticate-user-controller';
import { makeCreateUserController } from '@main/factories/create-user-controller';
import { makeForgotPasswordController } from '@main/factories/forgot-password-controller';
import { makeResetPasswordController } from '@main/factories/reset-password-controller';

export default {
  Query: {
    login: async (parent: any, args: any, context: any) =>
      adaptResolver(makeAuthenticateUserController(), args, context),
  },

  Mutation: {
    signup: async (parent: any, args: any) =>
      adaptResolver(makeCreateUserController(), args),

    forgotPassword: async (parent: any, args: any) =>
      adaptResolver(makeForgotPasswordController(), args),

    reset: async (parent: any, args: any) =>
      adaptResolver(makeResetPasswordController(), args),
  },
};
