import AppError from '@shared/errors/app-error';
import ICacheProvider from '@providers/cache/i-cache-provider';
import IUserRepository from '@providers/repositories/i-user-repository';
import { UserEntity } from '@entities/userEntity';
import { IEncoder } from '../providers/encoder/i-encoder';
import { IUseCase } from './ports/i-use-case';

export type Input = {
  name: string;
  email: string;
  password: string;
};

export namespace Output {
  export type Error = AppError;
  export type Success = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

class CreateUserUseCase implements IUseCase {
  private userRepository: IUserRepository;

  private encoder: IEncoder;

  private cacheProvider: ICacheProvider;

  constructor(
    userRepository: IUserRepository,
    encoder: IEncoder,
    cacheProvider: ICacheProvider,
  ) {
    this.userRepository = userRepository;
    this.encoder = encoder;
    this.cacheProvider = cacheProvider;
  }

  public async perform(input: Input): Promise<Output.Error | Output.Success> {
    const checkUserExists = await this.userRepository.findByEmail(input.email);

    if (checkUserExists) {
      throw new AppError('This e-mail is already being used');
    }

    const hashedPassword = await this.encoder.encode(input.password);

    const userEntity = UserEntity.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await this.userRepository.save(userEntity);

    await this.cacheProvider.invalidatePrefix('list-providers');

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default CreateUserUseCase;
