import AppError from '@errors/AppError';
import FakeHashProvider from '@providers/hash/impl/FakeHashProvider';
// import IMailProvider from '@providers/mail/IMailProvider';
import FakeUsersRepository from '@repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@repositories/fakes/FakeUserTokenRepository';
import AuthService from '@services/auth.service';
import { randomUUID } from 'crypto';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: AuthService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new AuthService(
      fakeUserRepository,
      fakeHashProvider,
      // {} as IMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('Deve redefinir a senha a partir de um token', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const user = await fakeUserRepository.save({
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      name: 'Leonardo Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.resetPassword({ token, password: '123123' });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('Não deve redefinir a senha com token inválido', async () => {
    await expect(
      resetPassword.resetPassword({
        token: 'blablabla',
        password: 'strong password here',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve redefinir senha de usuário que não existe mais', async () => {
    const resetData = await fakeUserTokenRepository.generate('user id');

    await expect(
      resetPassword.resetPassword({
        token: resetData.token,
        password: 'strong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve redefinir senha com token expirado', async () => {
    const user = await fakeUserRepository.save({
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      name: 'Leonardo Henrique',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date();

      return date.setHours(date.getHours() + 3);
    });

    await expect(
      resetPassword.resetPassword({ token, password: '123123' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
