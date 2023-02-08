import Notification from '@providers/repositories/typeorm/schemas/notification';
import ICreateNotificationDTO from './dtos/i-create-notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
