import { AppointmentEntity } from '@entities/appointments';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import ICreateAppointmentDTO from '../dtos/i-create-appointment';
import IFindAllAppointmentInDay from '../dtos/i-find-all-appointment-in-day';
import IFindAppointmentsInMonthDTO from '../dtos/i-find-appointments-in-month';
import IAppointmentRepository from '../i-appointment-repository';

export default class FakeAppointmentRepository
  implements IAppointmentRepository
{
  private appointments: AppointmentEntity[] = [];

  public async save({
    providerId,
    date,
    userId,
  }: ICreateAppointmentDTO): Promise<AppointmentEntity> {
    const appointmentEntity = AppointmentEntity.create({
      createdAt: new Date(),
      date,
      providerId,
      updatedAt: new Date(),
      userId,
    });

    this.appointments.push(appointmentEntity);
    return appointmentEntity;
  }

  public async findInMonth({
    providerId,
    year,
    month,
  }: IFindAppointmentsInMonthDTO): Promise<AppointmentEntity[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<AppointmentEntity | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.providerId === providerId,
    );

    return findAppointment;
  }

  public async findAllInDay({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<AppointmentEntity[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.providerId === providerId &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );
    return appointments;
  }
}
