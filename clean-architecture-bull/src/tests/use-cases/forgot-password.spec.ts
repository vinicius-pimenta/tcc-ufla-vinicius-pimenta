import { UserEntity } from '@entities/userEntity';
import FakeMailProvider from '@providers/mail/impl/fake-mail-provider';
import { FakeQueueProvider } from '@providers/queue/implementations/fake-queue.provider';
import FakeUserTokenRepository from '@providers/repositories/fakes/fake-user-token-repository';
import FakeUsersRepository from '@providers/repositories/fakes/fake-users-repository';
import AppError from '@shared/errors/app-error';

import ForgotPasswordUseCase from '@use-cases/forgot-password';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let fakeQuueProvider: FakeQueueProvider;
let forgotPasswordUseCase: ForgotPasswordUseCase;

describe('Forgot Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeQuueProvider = new FakeQueueProvider();

    forgotPasswordUseCase = new ForgotPasswordUseCase(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
      fakeQuueProvider,
    );
  });

  it('Não deve permitir recuperar senha de usuário não cadastrado', async () => {
    await expect(
      forgotPasswordUseCase.perform({
        email: 'lhleonardo@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve criar um token único para recuperação de senha', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.save(
      UserEntity.create({
        name: 'Leonardo Henrique de Braz',
        email: 'lhleonardo@hotmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await forgotPasswordUseCase.perform({
      email: 'lhleonardo@hotmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
