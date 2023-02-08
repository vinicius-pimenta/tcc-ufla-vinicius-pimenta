import AuthenticateUserController from 'presentation/controllers/authenticate-user';
import AuthenticateUserUseCase from '@use-cases/authenticate-user';
import { makeUserRepository } from './user-repository';
import { makeEncoder } from './encoder';
import { makeTokenManager } from './token-manager';

export const makeAuthenticateUserController =
  (): AuthenticateUserController => {
    const userRepository = makeUserRepository();
    const encoder = makeEncoder();
    const tokenManager = makeTokenManager();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      encoder,
      tokenManager,
    );
    const authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase,
    );
    return authenticateUserController;
  };
