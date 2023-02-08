import INotificationsRepository from '@providers/repositories/i-notifications-repository';
import ICreateNotificationDTO from '@providers/repositories/dtos/i-create-notification';
import Notification from '@providers/repositories/prisma/schemas/notification';

class CreateNotificationUseCase {
  private readonly notificationRepository: INotificationsRepository;

  constructor(notificationRepository: INotificationsRepository) {
    this.notificationRepository = notificationRepository;
  }

  public perform({
    recipientId,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    return this.notificationRepository.create({ recipientId, content });
  }
}

export default CreateNotificationUseCase;
