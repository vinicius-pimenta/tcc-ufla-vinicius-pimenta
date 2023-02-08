import UpdateAvatarUseCase from '@use-cases/update-avatar';
import UpdateAvatarController from 'presentation/controllers/update-avatar';
import { makeS3Storage } from './s3-storage';
import { makeUserRepository } from './user-repository';

export const makeUpdateAvatarController = (): UpdateAvatarController => {
  const userRepository = makeUserRepository();
  const storage = makeS3Storage();
  const updateAvatarUseCase = new UpdateAvatarUseCase(userRepository, storage);
  const updateAvatarController = new UpdateAvatarController(
    updateAvatarUseCase,
  );
  return updateAvatarController;
};
