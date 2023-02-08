import Notification from '@providers/repositories/prisma/schemas/notification';
import ICreateNotificationDTO from './dtos/i-create-notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
