import CreateAppointmentUseCase from '@use-cases/create-appointment';
import CreateAppointmentsController from 'presentation/controllers/create-appointments';
import { makeAppointmentRepository } from './appointment-repository';
import { makeDateProvider } from './date-fns';
import { makeIoredis } from './ioredis';

export const makeCreateAppointmentsController =
  (): CreateAppointmentsController => {
    const appointmentRepository = makeAppointmentRepository();
    const cacheProvider = makeIoredis();
    const dateProvider = makeDateProvider();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentRepository,
      cacheProvider,
      dateProvider,
    );
    const createAppointmentsController = new CreateAppointmentsController(
      createAppointmentUseCase,
    );
    return createAppointmentsController;
  };
