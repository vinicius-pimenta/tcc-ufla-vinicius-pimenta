import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import { endOfDay, getDate, getDaysInMonth, isBefore } from 'date-fns';

type IFindProvidersByMonthAvailability = {
  providerId: string;
  month: number;
  year: number;
};

type IProviderMonthAvailability = Array<{
  day: number;
  available: boolean;
}>;

class ListProviderMonthAvailabilityUseCase {
  private readonly appointmentsRepository: IAppointmentRepository;

  constructor(appointmentsRepository: IAppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async perform({
    providerId,
    month,
    year,
  }: IFindProvidersByMonthAvailability): Promise<IProviderMonthAvailability> {
    const appointments = await this.appointmentsRepository.findInMonth({
      providerId,
      year,
      month,
    });

    const today = Date.now();

    const numberOfDays = getDaysInMonth(new Date(year, month - 1));

    const days = Array.from({ length: numberOfDays }, (_, index) => {
      const day = index + 1;

      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      const isValidDay = isBefore(
        today,
        endOfDay(new Date(year, month - 1, day)),
      );

      return {
        day,
        available: isValidDay && appointmentsInDay.length < 10,
      };
    });

    return days;
  }
}

export default ListProviderMonthAvailabilityUseCase;
