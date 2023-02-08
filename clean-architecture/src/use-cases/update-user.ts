import AppError from '@shared/errors/app-error';
import IUpdateUserDTO from '@providers/repositories/dtos/i-update-user';
import IUserRepository from '@providers/repositories/i-user-repository';
import { UserEntity } from '@entities/userEntity';
import { IEncoder } from '../providers/encoder/i-encoder';

class UpdateUserUseCase {
  private userRepository: IUserRepository;

  private encoder: IEncoder;

  constructor(userRepository: IUserRepository, encoder: IEncoder) {
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  public async perform({
    userId,
    name,
    email,
    oldPassword,
    password,
  }: IUpdateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    user.changeName(name);

    const findEmail = await this.userRepository.findByEmail(email);

    if (findEmail && findEmail.id !== userId) {
      throw new AppError('Esse e-mail já está sendo utilizado.');
    }
    user.changeEmail(email);

    if (password && !oldPassword) {
      throw new AppError('Confirmação de senha é necessária para mudança.');
    }

    if (password && oldPassword) {
      const validOldPassword = await this.encoder.compare(
        oldPassword,
        user.password,
      );

      if (!validOldPassword) {
        throw new AppError('Senha antiga não coincide com a senha atual');
      }

      user.changePassword(await this.encoder.encode(password));
    }

    return this.userRepository.save(user);
  }
}

export default UpdateUserUseCase;
