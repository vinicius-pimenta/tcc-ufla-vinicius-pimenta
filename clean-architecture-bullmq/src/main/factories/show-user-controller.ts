import { ShowUserUseCase } from '@use-cases/show-user';
import ShowUserController from 'presentation/controllers/show-user';
import { makeUserRepository } from './user-repository';

export const makeShowUserController = (): ShowUserController => {
  const userRepository = makeUserRepository();
  const showUserUseCase = new ShowUserUseCase(userRepository);
  const showUserController = new ShowUserController(showUserUseCase);
  return showUserController;
};
