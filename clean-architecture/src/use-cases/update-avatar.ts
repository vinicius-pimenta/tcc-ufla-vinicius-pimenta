import AppError from '@shared/errors/app-error';
import IStorageProvider from '@providers/storage/i-storage-provider';
import IUserRepository from '@providers/repositories/i-user-repository';
import { UserEntity } from '@entities/userEntity';

type IUpdateAvatarDTO = {
  userId: string;
  avatarFilename: string;
};

export default class UpdateAvatarUseCase {
  private userRepository: IUserRepository;

  private storage: IStorageProvider;

  constructor(userRepository: IUserRepository, storage: IStorageProvider) {
    this.userRepository = userRepository;
    this.storage = storage;
  }

  public async perform({
    userId,
    avatarFilename,
  }: IUpdateAvatarDTO): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 403);
    }

    // precisa apagar avatar antigo
    if (user.avatar) {
      await this.storage.deleteFile(user.avatar);
    }

    user.changeAvatar(await this.storage.uploadFile(avatarFilename));

    return this.userRepository.save(user);
  }
}
