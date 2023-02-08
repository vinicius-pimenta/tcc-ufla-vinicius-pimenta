import ResetPasswordUseCase from '@use-cases/reset-password';
import ResetPasswordController from 'presentation/controllers/reset-password';
import { makeEncoder } from './encoder';
import { makeUserRepository } from './user-repository';
import { makeUserTokenRepository } from './user-token-repository';

export const makeResetPasswordController = (): ResetPasswordController => {
  const userRepository = makeUserRepository();
  const hash = makeEncoder();
  const userTokenRepository = makeUserTokenRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(
    userRepository,
    hash,
    userTokenRepository,
  );
  const resetPasswordController = new ResetPasswordController(
    resetPasswordUseCase,
  );
  return resetPasswordController;
};
