import AppError from '@shared/errors/app-error';
import IUserRepository from '@providers/repositories/i-user-repository';
import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import { addHours, isAfter } from 'date-fns';
import { IEncoder } from '../providers/encoder/i-encoder';

type IResetPassword = {
  token: string;
  password: string;
};

class ResetPasswordUseCase {
  private userRepository: IUserRepository;

  private hash: IEncoder;

  private userTokenRepository: IUserTokenRepository;

  constructor(
    userRepository: IUserRepository,
    hash: IEncoder,
    userTokenRepository: IUserTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.hash = hash;
    this.userTokenRepository = userTokenRepository;
  }

  public async perform({ token, password }: IResetPassword): Promise<void> {
    const registry = await this.userTokenRepository.getByToken(token);

    if (!registry) {
      throw new AppError('Token inválido ou inexistente');
    }

    const user = await this.userRepository.findById(registry.user_id);

    if (!user) {
      throw new AppError('Usuário inexistente');
    }

    const limitedTime = addHours(registry.createdAt, 2);

    if (isAfter(Date.now(), limitedTime)) {
      throw new AppError('Token excedeu o tempo máximo para utilização');
    }

    user.changePassword(await this.hash.encode(password));

    await this.userRepository.save(user);
  }
}

export default ResetPasswordUseCase;
