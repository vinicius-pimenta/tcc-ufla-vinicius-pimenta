import IAppointmentRepository from '@repositories/IAppointmentRepository';
import AppointmentRepository from '@repositories/prisma/appointment-repository';
import NotificationsRepository from '@repositories/prisma/NotificationRepositories';
import UserTokenRepository from '@repositories/prisma/user-token-repository';
import INotificationsRepository from '@repositories/INotificationsRepository';
import IUserRepository from '@repositories/IUserRepository';
import IUserTokenRepository from '@repositories/IUserTokenRepository';
import { container } from 'tsyringe';
import UserRepository from '@repositories/prisma/user-repository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
