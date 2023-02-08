import Notification from '@providers/repositories/typeorm/schemas/notification';
import ICreateNotificationDTO from '@providers/repositories/dtos/i-create-notification';
import INotificationsRepository from '@providers/repositories/i-notifications-repository';
import { getMongoRepository, MongoRepository } from 'typeorm';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    recipientId,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ recipientId, content });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
