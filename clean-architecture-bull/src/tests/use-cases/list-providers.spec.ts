import { UserEntity } from '@entities/userEntity';
import FakeCacheProvider from '@providers/cache/impl/fake-cache-provider';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import ListProvidersUseCase from '@use-cases/list-providers';

let userRepository: FakeUsersRepository;
let listProvidersUseCase: ListProvidersUseCase;
let cacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    cacheProvider = new FakeCacheProvider();
    listProvidersUseCase = new ListProvidersUseCase(
      userRepository,
      cacheProvider,
    );
  });
  it('Deve listar todos os prestadores de serviço', async () => {
    const loggedUser = await userRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    const provider1 = await userRepository.save(
      UserEntity.create({
        name: 'Matheus Castro',
        email: 'matheus@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
    const provider2 = await userRepository.save(
      UserEntity.create({
        name: 'Maria Aparecida',
        email: 'maria@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const providers = await listProvidersUseCase.perform({
      excludeUserId: loggedUser.id,
    });

    const expectedUsers = [provider1, provider2];

    expect(providers).toEqual(expectedUsers);
  });
});
