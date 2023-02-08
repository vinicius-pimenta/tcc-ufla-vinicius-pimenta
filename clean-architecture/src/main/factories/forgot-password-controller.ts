import ForgotPasswordUseCase from '@use-cases/forgot-password';
import ForgotPasswordController from 'presentation/controllers/forgot-password';
import { makeSESMailService } from './ses-mail-service';
import { makeUserRepository } from './user-repository';
import { makeUserTokenRepository } from './user-token-repository';

export const makeForgotPasswordController = (): ForgotPasswordController => {
  const userRepository = makeUserRepository();
  const mailService = makeSESMailService();
  const userTokenRepository = makeUserTokenRepository();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    userRepository,
    mailService,
    userTokenRepository,
  );
  const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase,
  );
  return forgotPasswordController;
};
