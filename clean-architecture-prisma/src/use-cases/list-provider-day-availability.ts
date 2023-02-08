import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import { getHours, isAfter } from 'date-fns';

type IFindProvidersByDayAvailability = {
  providerId: string;
  year: number;
  month: number;
  day: number;
};

type IProviderDayAvailability = Array<{
  hour: number;
  available: boolean;
}>;

class ListProviderDayAvailabilityUseCase {
  private readonly appointmentsRepository: IAppointmentRepository;

  constructor(appointmentsRepository: IAppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async perform({
    providerId,
    day,
    month,
    year,
  }: IFindProvidersByDayAvailability): Promise<IProviderDayAvailability> {
    const appointments = await this.appointmentsRepository.findAllInDay({
      providerId,
      day,
      month,
      year,
    });

    const hoursOfWork = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const currentDate = Date.now();

    const availability = hoursOfWork.map(hour => {
      const hasAppointment = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const comparedDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointment && isAfter(comparedDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityUseCase;
