import { MailtrapMailProvider } from '@providers/mail/impl/mailtrap-mail-provider';
import ForgotPasswordUseCase from '@use-cases/forgot-password';
import ForgotPasswordController from 'presentation/controllers/forgot-password';
import { makeQueueProivder } from './queue-provider';
import { makeUserRepository } from './user-repository';
import { makeUserTokenRepository } from './user-token-repository';

export const makeForgotPasswordController = (): ForgotPasswordController => {
  const userRepository = makeUserRepository();
  const mailService = new MailtrapMailProvider();
  const userTokenRepository = makeUserTokenRepository();
  const queueProvider = makeQueueProivder();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    userRepository,
    mailService,
    userTokenRepository,
    queueProvider,
  );
  const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase,
  );
  return forgotPasswordController;
};
