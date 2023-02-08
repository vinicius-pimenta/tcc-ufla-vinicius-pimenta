import ListProviderDayAvailabilityUseCase from '@use-cases/list-provider-day-availability';
import ListProviderDayAvailabilityController from 'presentation/controllers/list-provider-day-availability';
import { makeAppointmentRepository } from './appointment-repository';

export const makeListProviderDayAvailabilityController =
  (): ListProviderDayAvailabilityController => {
    const appointmentRepository = makeAppointmentRepository();
    const listProviderDayAvailabilityUseCase =
      new ListProviderDayAvailabilityUseCase(appointmentRepository);
    const listProviderDayAvailabilityController =
      new ListProviderDayAvailabilityController(
        listProviderDayAvailabilityUseCase,
      );
    return listProviderDayAvailabilityController;
  };
