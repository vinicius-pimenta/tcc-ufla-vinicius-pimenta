import FakeNotificationsRepository from '@providers/repositories/fakes/fake-notifications-repository';
import CreateNotificationUseCase from '@use-cases/create-notification';

let notificationsRepository: FakeNotificationsRepository;
let createNotificationUseCase: CreateNotificationUseCase;

describe('NotificationUseCase', () => {
  beforeEach(() => {
    notificationsRepository = new FakeNotificationsRepository();
    createNotificationUseCase = new CreateNotificationUseCase(
      notificationsRepository,
    );
  });
  it('Deve criar uma notificação', async () => {
    const create = jest.spyOn(notificationsRepository, 'create');

    await createNotificationUseCase.perform({
      recipientId: 'user-id',
      content: 'cool-message',
    });

    expect(create).toBeCalledWith({
      recipientId: 'user-id',
      content: 'cool-message',
    });
  });
});
