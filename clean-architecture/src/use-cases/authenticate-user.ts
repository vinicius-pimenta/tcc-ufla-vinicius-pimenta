import AppError from '@shared/errors/app-error';
import IUserRepository from '@providers/repositories/i-user-repository';
import { IEncoder } from '../providers/encoder/i-encoder';
import { IUseCase } from './ports/i-use-case';
import { ITokenManager } from '../providers/token-manager/i-token-manager';

type Input = { email: string; password: string };

export namespace Output {
  export type Error = AppError;
  export type Success = {
    user: { id: string; name: string; email: string; avatar?: string };
    token: string;
  };
}

class AuthenticateUserUseCase implements IUseCase {
  private readonly userRepository: IUserRepository;

  private readonly encoder: IEncoder;

  private readonly tokenManager: ITokenManager;

  constructor(
    userRepository: IUserRepository,
    encoder: IEncoder,
    tokenManager: ITokenManager,
  ) {
    this.userRepository = userRepository;
    this.encoder = encoder;
    this.tokenManager = tokenManager;
  }

  public async perform(input: Input): Promise<Output.Error | Output.Success> {
    const validUser = await this.userRepository.findByEmail(input.email);

    if (!validUser) throw new AppError('Bad credentials.', 401);

    const validPassword = await this.encoder.compare(
      input.password,
      validUser.password,
    );

    if (!validPassword) throw new AppError('Bad credentials.', 401);

    const token = await this.tokenManager.sign({ id: validUser.id });

    return {
      user: {
        email: validUser.email,
        id: validUser.id,
        name: validUser.name,
        avatar: validUser.avatar,
      },
      token,
    };
  }
}

export default AuthenticateUserUseCase;
