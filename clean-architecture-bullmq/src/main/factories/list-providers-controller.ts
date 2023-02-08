import ListProvidersUseCase from '@use-cases/list-providers';
import ListProvidersController from 'presentation/controllers/list-providers';
import { makeIoredis } from './ioredis';
import { makeUserRepository } from './user-repository';

export const makeListProvidersController = (): ListProvidersController => {
  const userRepository = makeUserRepository();
  const cacheProvider = makeIoredis();
  const listProvidersUseCase = new ListProvidersUseCase(
    userRepository,
    cacheProvider,
  );
  const listProvidersController = new ListProvidersController(
    listProvidersUseCase,
  );
  return listProvidersController;
};
