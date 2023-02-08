import { appointments } from '@prisma/client';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IFindAllAppointmentInDay from '../dtos/IFindAllAppointmentInDay';
import IFindAppointmentsInMonthDTO from '../dtos/IFIndAppointmentsInMonthDTO';
import IAppointmentRepository from '../IAppointmentRepository';

export default class FakeAppointmentRepository
  implements IAppointmentRepository
{
  private appointments: appointments[] = [];

  public async save(data: appointments): Promise<appointments> {
    this.appointments.push(data);
    return data;
  }

  public async findInMonth({
    providerId,
    year,
    month,
  }: IFindAppointmentsInMonthDTO): Promise<appointments[]> {
    const appointmentsDb = this.appointments.filter(
      appointment =>
        appointment.provider_id === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointmentsDb;
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<appointments | null> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === providerId,
    );

    if (!findAppointment) return null;

    return findAppointment;
  }

  public async findAllInDay({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<appointments[]> {
    const appointmentsDb = this.appointments.filter(
      appointment =>
        appointment.provider_id === providerId &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );

    return appointmentsDb;
  }
}
