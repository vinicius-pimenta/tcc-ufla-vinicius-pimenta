import AppError from '@shared/errors/app-error';
import IUserRepository from '@providers/repositories/i-user-repository';

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

export class ShowUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async perform(userId: string): Promise<Output.Error | Output.Success> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário inexistente');
    }

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

export default ShowUserUseCase;
