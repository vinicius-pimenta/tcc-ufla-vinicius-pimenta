import AppError from '@shared/errors/app-error';
import AuthenticateUserUseCase from '@use-cases/authenticate-user';
import CreateUserUseCase from '@use-cases/create-user';
import { makeEncoder } from '@main/factories/encoder';
import { makeTokenManager } from '@main/factories/token-manager';
import FakeCacheProvider from '@providers/cache/impl/fake-cache-provider';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';

let fakeRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('AuthenticationUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeRepository = new FakeUsersRepository();
    const encoder = makeEncoder();
    const tokenManager = makeTokenManager();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeRepository,
      encoder,
      tokenManager,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      fakeRepository,
      encoder,
      tokenManager,
    );
    createUserUseCase = new CreateUserUseCase(
      fakeRepository,
      encoder,
      fakeCacheProvider,
    );
  });

  it('Deve autenticar um usuário', async () => {
    await createUserUseCase.perform({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    const user = await authenticateUserUseCase.perform({
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('Não deve se autenticar com usuário não cadastrado', async () => {
    await expect(
      authenticateUserUseCase.perform({
        email: 'lhleonardo@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Não deve se autenticar com credenciais inválidas', async () => {
    await createUserUseCase.perform({
      name: 'Leonardo Henrique de Braz',
      email: 'lhleonardo@hotmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserUseCase.perform({
        email: 'lhleonardo@hotmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
