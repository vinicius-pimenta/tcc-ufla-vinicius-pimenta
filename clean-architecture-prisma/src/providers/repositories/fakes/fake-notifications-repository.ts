import Notification from '@providers/repositories/prisma/schemas/notification';
import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '../dtos/i-create-notification';
import INotificationsRepository from '../i-notifications-repository';

export default class FakeNotificationsRepository
  implements INotificationsRepository
{
  private notifications: Notification[] = [];

  async create({
    recipientId,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipientId, content });

    this.notifications.push(notification);
    return notification;
  }
}
