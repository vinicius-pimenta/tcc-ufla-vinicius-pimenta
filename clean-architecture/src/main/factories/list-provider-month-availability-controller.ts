import ListProviderMonthAvailabilityUseCase from '@use-cases/list-provider-month-availability';
import ListProviderMonthAvailabilityController from 'presentation/controllers/list-provider-month-availability';
import { makeAppointmentRepository } from './appointment-repository';

export const makeListProviderMonthAvailabilityController =
  (): ListProviderMonthAvailabilityController => {
    const appointmentRepository = makeAppointmentRepository();
    const listProviderMonthAvailabilityUseCase =
      new ListProviderMonthAvailabilityUseCase(appointmentRepository);
    const listProviderMonthAvailabilityController =
      new ListProviderMonthAvailabilityController(
        listProviderMonthAvailabilityUseCase,
      );
    return listProviderMonthAvailabilityController;
  };
