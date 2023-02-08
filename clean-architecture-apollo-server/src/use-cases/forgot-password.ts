import AppError from '@shared/errors/app-error';
import IMailProvider from '@providers/mail/i-mail-provider';
import IUserRepository from '@providers/repositories/i-user-repository';
import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import path from 'path';

type IForgotPassword = {
  email: string;
};

class ForgotPasswordUseCase {
  private userRepository: IUserRepository;

  private mailService: IMailProvider;

  private userTokenRepository: IUserTokenRepository;

  constructor(
    userRepository: IUserRepository,
    mailService: IMailProvider,
    userTokenRepository: IUserTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.mailService = mailService;
    this.userTokenRepository = userTokenRepository;
  }

  public async perform({ email }: IForgotPassword): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`O e-mail ${email} não está cadastrado na aplicação`);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailService.sendMail({
      subject: 'Redefinição de senha',
      to: { name: user.name, email: user.email },
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
    });
  }
}

export default ForgotPasswordUseCase;
