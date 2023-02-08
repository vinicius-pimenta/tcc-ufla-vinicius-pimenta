import { appointments } from '@prisma/client';
import { prisma } from '@database/prisma';
import IAppointmentRepository from '@repositories/IAppointmentRepository';
import IFindAppointmentsInMonthDTO from '@repositories/dtos/IFIndAppointmentsInMonthDTO';
import IFindAllAppointmentInDay from '@repositories/dtos/IFindAllAppointmentInDay';

export default class AppointmentRepository implements IAppointmentRepository {
  public async save(data: appointments): Promise<appointments> {
    const appointment = await prisma.appointments.create({
      data,
    });

    return appointment;
  }

  public async findInMonth({
    providerId,
    year,
    month,
  }: IFindAppointmentsInMonthDTO): Promise<appointments[]> {
    const dateGte = new Date(year, month);
    const dateLt = new Date(year, month);

    const appointmentsDb = await prisma.appointments.findMany({
      where: {
        provider_id: providerId,
        date: { gte: dateGte, lt: dateLt },
      },
    });

    return appointmentsDb;
  }

  public async findAllInDay({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<appointments[]> {
    const dateGte = new Date(year, month - 1, day);
    const dateLt = new Date(year, month - 1, day + 1);

    const appointmentsDb = await prisma.appointments.findMany({
      where: {
        provider_id: providerId,
        date: { gte: dateGte, lt: dateLt },
      },
    });

    return appointmentsDb;
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<appointments | null> {
    const findAppointment = await prisma.appointments.findFirst({
      where: {
        date,
        provider_id: providerId,
      },
    });

    return findAppointment;
  }
}
