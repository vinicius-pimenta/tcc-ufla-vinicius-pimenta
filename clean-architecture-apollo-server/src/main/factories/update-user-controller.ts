import UpdateUserUseCase from '@use-cases/update-user';
import UpdateUserController from 'presentation/controllers/update-user';
import { makeEncoder } from './encoder';
import { makeUserRepository } from './user-repository';

export const makeUpdateUserController = (): UpdateUserController => {
  const userRepository = makeUserRepository();
  const encoder = makeEncoder();
  const updateUserUseCase = new UpdateUserUseCase(userRepository, encoder);
  const updateUserController = new UpdateUserController(updateUserUseCase);
  return updateUserController;
};
