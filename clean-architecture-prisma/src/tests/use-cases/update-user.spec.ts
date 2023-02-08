import { UserEntity } from '@entities/userEntity';
import FakeHashProvider from '@providers/encoder/impl/fake-hash-provider';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import AppError from '@shared/errors/app-error';

import UpdateUserUseCase from '@use-cases/update-user';

let userRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateUserUseCase: UpdateUserUseCase;

describe('Update User', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    updateUserUseCase = new UpdateUserUseCase(userRepository, hashProvider);
  });

  it('Não deve atualizar o perfil de um usuário inválido', async () => {
    await expect(
      updateUserUseCase.perform({
        userId: 'wrong-user-id',
        name: 'Leonardo Braz',
        email: 'lhleonardo@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve atualizar o perfil', async () => {
    const createdUser = await userRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await updateUserUseCase.perform({
      userId: createdUser.id,
      name: 'Leonardo Braz',
      email: 'lhleonardo05@gmail.com',
      oldPassword: '123123',
      password: 'maracuja',
    });

    const updatedUser = await userRepository.findById(createdUser.id);

    expect(updatedUser?.name).toBe('Leonardo Braz');
    expect(updatedUser?.email).toBe('lhleonardo05@gmail.com');
    expect(updatedUser?.password).toBe('maracuja');
  });

  it('Deve alterar a senha somente confirmando a senha antiga', async () => {
    const createdUser = await userRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      updateUserUseCase.perform({
        userId: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        oldPassword: '1234',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve alterar a senha se não informar senha antiga', async () => {
    const createdUser = await userRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      updateUserUseCase.perform({
        userId: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve atualizar o e-mail caso troque para um já existente', async () => {
    await userRepository.save(
      UserEntity.create({
        name: 'Julia Caroline',
        email: 'julia@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const user = await userRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await expect(
      updateUserUseCase.perform({
        userId: user.id,
        name: 'Leonardo Braz',
        email: 'julia@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
