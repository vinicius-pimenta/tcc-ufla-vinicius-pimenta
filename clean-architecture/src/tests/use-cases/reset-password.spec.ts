import { UserEntity } from '@entities/userEntity';
import FakeHashProvider from '@providers/encoder/impl/fake-hash-provider';
import FakeUserTokenRepository from '@providers/repositories/fakes/fake-user-token-repository';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import AppError from '@shared/errors/app-error';

import ResetPasswordUseCase from '@use-cases/reset-password';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordUseCase = new ResetPasswordUseCase(
      fakeUserRepository,
      fakeHashProvider,
      fakeUserTokenRepository,
    );
  });
  it('Deve redefinir a senha a partir de um token', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'encode');
    const userEntity = UserEntity.create({
      name: 'Leonardo Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await fakeUserRepository.save(userEntity);

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordUseCase.perform({ token, password: '123123' });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('Não deve redefinir a senha com token inválido', async () => {
    await expect(
      resetPasswordUseCase.perform({
        token: 'blablabla',
        password: 'strong password here',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve redefinir senha de usuário que não existe mais', async () => {
    const resetData = await fakeUserTokenRepository.generate('user id');

    await expect(
      resetPasswordUseCase.perform({
        token: resetData.token,
        password: 'strong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve redefinir senha com token expirado', async () => {
    const userEntity = UserEntity.create({
      name: 'Leonardo Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const user = await fakeUserRepository.save(userEntity);

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date();

      return date.setHours(date.getHours() + 3);
    });

    await expect(
      resetPasswordUseCase.perform({ token, password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
