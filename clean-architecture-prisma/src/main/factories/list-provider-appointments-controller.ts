import FindAppointmentUseCase from '@use-cases/find-appointment';
import ListProviderAppointmentsController from 'presentation/controllers/list-provider-appointments';
import { makeAppointmentRepository } from './appointment-repository';
import { makeIoredis } from './ioredis';

export const makeListProviderAppointmentsController =
  (): ListProviderAppointmentsController => {
    const appointmentRepository = makeAppointmentRepository();
    const cacheProvider = makeIoredis();
    const findAppointmentUseCase = new FindAppointmentUseCase(
      appointmentRepository,
      cacheProvider,
    );
    const listProviderAppointmentsController =
      new ListProviderAppointmentsController(findAppointmentUseCase);
    return listProviderAppointmentsController;
  };
