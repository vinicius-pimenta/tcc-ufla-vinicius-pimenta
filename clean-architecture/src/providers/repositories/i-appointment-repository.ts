import { AppointmentEntity } from '@entities/appointments';
import IFindAllAppointmentInDay from './dtos/i-find-all-appointment-in-day';
import IFindAppointmentsInMonthDTO from './dtos/i-find-appointments-in-month';

export default interface IAppointmentRepository {
  save(data: AppointmentEntity): Promise<AppointmentEntity>;

  findByDate(
    date: Date,
    providerId: string,
  ): Promise<AppointmentEntity | undefined>;

  findInMonth(data: IFindAppointmentsInMonthDTO): Promise<AppointmentEntity[]>;

  findAllInDay(data: IFindAllAppointmentInDay): Promise<AppointmentEntity[]>;
}
