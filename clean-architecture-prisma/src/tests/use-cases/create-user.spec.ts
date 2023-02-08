import { UserEntity } from '@entities/userEntity';
import FakeCacheProvider from '@providers/cache/impl/fake-cache-provider';
import FakeHashProvider from '@providers/encoder/impl/fake-hash-provider';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import AppError from '@shared/errors/app-error';

import CreateUserUseCase from '@use-cases/create-user';

let fakeRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserUseCase = new CreateUserUseCase(
      fakeRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Deve criar um novo usuário', async () => {
    const createdUser = await createUserUseCase.perform({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(createdUser).toHaveProperty('id');
  });

  it('Não deve permitir e-mail duplicado', async () => {
    const user = UserEntity.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await createUserUseCase.perform(user);

    expect(createUserUseCase.perform(user)).rejects.toBeInstanceOf(AppError);
  });
});
