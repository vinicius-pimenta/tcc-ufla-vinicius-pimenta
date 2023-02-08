import { UserEntity } from '@entities/userEntity';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import AppError from '@shared/errors/app-error';

import { ShowUserUseCase, Output } from '@use-cases/show-user';

let userRepository: FakeUsersRepository;
let showUserUseCase: ShowUserUseCase;

describe('ShowUserService', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    showUserUseCase = new ShowUserUseCase(userRepository);
  });
  it('Deve mostrar os dados do usuário logado', async () => {
    const userEntity = UserEntity.create({
      name: 'Leonardo Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const loggedUser = await userRepository.save(userEntity);

    const result = await showUserUseCase.perform(loggedUser.id);

    expect((result as Output.Success).name).toEqual(loggedUser.name);
    expect((result as Output.Success).email).toEqual(loggedUser.email);
  });

  it('Não deve mostrar dados de um usuário inexistente', async () => {
    await expect(
      showUserUseCase.perform('wrong-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
