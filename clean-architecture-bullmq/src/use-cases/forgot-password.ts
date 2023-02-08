import AppError from '@shared/errors/app-error';
import IMailProvider from '@providers/mail/i-mail-provider';
import IUserRepository from '@providers/repositories/i-user-repository';
import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import path from 'path';

import { MailJob } from '@providers/queue/mail-job';
import { IQueueProvider } from '@providers/queue/queue-provider.interface';

type IForgotPassword = {
  email: string;
};

class ForgotPasswordUseCase {
  private userRepository: IUserRepository;

  private mailService: IMailProvider;

  private userTokenRepository: IUserTokenRepository;

  private queueProvider: IQueueProvider;

  constructor(
    userRepository: IUserRepository,
    mailService: IMailProvider,
    userTokenRepository: IUserTokenRepository,
    queueProvider: IQueueProvider,
  ) {
    this.userRepository = userRepository;
    this.mailService = mailService;
    this.userTokenRepository = userTokenRepository;
    this.queueProvider = queueProvider;
  }

  public async perform({ email }: IForgotPassword): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`O e-mail ${email} não está cadastrado na aplicação`);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const messageJob = MailJob.create(this.mailService);

    this.queueProvider.addJob({
      data: {
        to: { name: user.name, email: user.email },
        subject: 'Redefinição de senha',
        template: {
          file: path.resolve(
            __dirname,
            '..',
            'views',
            'forgot-password-template.hbs',
          ),
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
            email: user.email,
          },
        },
        type: 'MAIL',
      },
      job: messageJob,
    });
  }
}

export default ForgotPasswordUseCase;
