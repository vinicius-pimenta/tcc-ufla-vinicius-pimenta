import CreateUserUseCase from '@use-cases/create-user';
import CreateUserController from 'presentation/controllers/create-user';
import { makeEncoder } from './encoder';
import { makeIoredis } from './ioredis';
import { makeUserRepository } from './user-repository';

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = makeUserRepository();
  const encoder = makeEncoder();
  const cacheProvider = makeIoredis();
  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    encoder,
    cacheProvider,
  );
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
};
