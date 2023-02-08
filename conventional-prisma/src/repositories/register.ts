import { container } from 'tsyringe';
import IAppointmentRepository from './IAppointmentRepository';
import AppointmentRepository from './prisma/appointment-repository';
import NotificationsRepository from './prisma/NotificationRepositories';
import UserTokenRepository from './prisma/user-token-repository';
import INotificationsRepository from './INotificationsRepository';
import IUserRepository from './IUserRepository';
import IUserTokenRepository from './IUserTokenRepository';
import UserRepository from './prisma/user-repository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
