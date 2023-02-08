import AppError from '@errors/AppError';
import FakeCacheProvider from '@providers/cache/impl/FakeCacheProvider';
import FakeHashProvider from '@providers/hash/impl/FakeHashProvider';
import IMailProvider from '@providers/mail/IMailProvider';
import FakeQueueProvider from '@providers/queue/implementations/fake-queue.provider';
import FakeUsersRepository from '@repositories/fakes/FakeUsersRepository';
import IUserTokenRepository from '@repositories/IUserTokenRepository';
import AuthService from '@services/auth.service';
import UserService from '@services/user.service';

let fakeRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let authUser: AuthService;
let createUser: UserService;
let fakeQueueProvider: FakeQueueProvider;

describe('AuthenticationUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeQueueProvider = new FakeQueueProvider();
    authUser = new AuthService(
      fakeQueueProvider,
      fakeRepository,
      fakeHashProvider,
      {} as IMailProvider,
      {} as IUserTokenRepository,
    );
    createUser = new UserService(
      fakeRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Deve autenticar um usuário', async () => {
    await createUser.createUser({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const user = await authUser.login({
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('Não deve se autenticar com usuário não cadastrado', async () => {
    await expect(
      authUser.login({ email: 'lhleonardo@hotmail.com', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Não deve se autenticar com credenciais inválidas', async () => {
    await createUser.createUser({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await expect(
      authUser.login({
        email: 'lhleonardo@hotmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
