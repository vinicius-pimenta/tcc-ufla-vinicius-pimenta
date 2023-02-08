import SessionsController from '@controllers/users/SessionsController';
import UsersController from '@controllers/users/UsersController';
import ForgotPasswordController from '@controllers/users/ForgotPasswordController';
import ResetPasswordController from '@controllers/users/ResetPasswordController';
import { adaptResolver } from '../../config/apollo-server-resolver-adapter';

export default {
  Query: {
    login: async (parent: any, args: any, context: any) =>
      adaptResolver(new SessionsController(), args, context),
  },

  Mutation: {
    signup: async (parent: any, args: any) =>
      adaptResolver(new UsersController(), args),

    forgotPassword: async (parent: any, args: any) =>
      adaptResolver(new ForgotPasswordController(), args),

    reset: async (parent: any, args: any) =>
      adaptResolver(new ResetPasswordController(), args),
  },
};
