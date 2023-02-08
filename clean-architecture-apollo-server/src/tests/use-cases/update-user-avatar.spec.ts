import { UserEntity } from '@entities/userEntity';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import FakeStorageProvider from '@providers/storage/impl/fake-storage-provider';
import AppError from '@shared/errors/app-error';

import UpdateAvatarUseCase from '@use-cases/update-avatar';

let fakeStorage: FakeStorageProvider;
let fakeRepository: FakeUsersRepository;
let updateAvatarUseCase: UpdateAvatarUseCase;

describe('Update Avatar', () => {
  beforeEach(() => {
    fakeStorage = new FakeStorageProvider();
    fakeRepository = new FakeUsersRepository();
    updateAvatarUseCase = new UpdateAvatarUseCase(fakeRepository, fakeStorage);
  });
  it('Deve atualizar a foto de perfil', async () => {
    const userEntity = UserEntity.create({
      email: 'lhleonardo@hotmail.com',
      name: 'Leonardo Braz',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await fakeRepository.save(userEntity);

    const response = await updateAvatarUseCase.perform({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(response.avatar).toBe('avatar.png');
  });

  it('Não deve atualizar avatar de usuário inválido', async () => {
    await expect(
      updateAvatarUseCase.perform({
        userId: 'invalid_user_id',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve trocar a foto de perfil do usuário e apagar a antiga', async () => {
    const mockedMethod = jest.spyOn(fakeStorage, 'deleteFile');
    const userEntity = UserEntity.create({
      email: 'lhleonardo@hotmail.com',
      name: 'Leonardo Braz',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await fakeRepository.save(userEntity);

    await updateAvatarUseCase.perform({
      userId: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateAvatarUseCase.perform({
      userId: user.id,
      avatarFilename: 'avatar_2.png',
    });

    expect(mockedMethod).toBeCalledWith('avatar.png');
  });
});
