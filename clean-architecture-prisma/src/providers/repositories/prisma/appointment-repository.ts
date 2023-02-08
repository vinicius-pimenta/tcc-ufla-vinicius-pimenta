import { AppointmentEntity } from '@entities/appointments';
import IFindAllAppointmentInDay from '@providers/repositories/dtos/i-find-all-appointment-in-day';
import IFindAppointmentsInMonthDTO from '@providers/repositories/dtos/i-find-appointments-in-month';
import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import { prisma } from '@shared/infra/database/prisma';

export default class AppointmentRepository implements IAppointmentRepository {
  public async save(data: AppointmentEntity): Promise<AppointmentEntity> {
    await prisma.appointments.create({
      data: {
        date: data.date,
        created_at: data.createdAt,
        id: data.id,
        provider_id: data.providerId,
        updated_at: data.updatedAt,
        user_id: data.userId,
      },
    });

    return data;
  }

  public async findInMonth({
    providerId,
    year,
    month,
  }: IFindAppointmentsInMonthDTO): Promise<AppointmentEntity[]> {
    const dateGte = new Date(year, month);
    const dateLt = new Date(year, month);

    const appointmentsDb = await prisma.appointments.findMany({
      where: {
        provider_id: providerId,
        date: { gte: dateGte, lt: dateLt },
      },
    });

    const appointmentsEntity = appointmentsDb.map(item =>
      AppointmentEntity.create(
        {
          createdAt: item.created_at,
          date: item.date,
          providerId: item.provider_id ?? '',
          updatedAt: item.updated_at,
          userId: item.user_id ?? '',
        },
        item.id,
      ),
    );

    return appointmentsEntity;
  }

  public async findAllInDay({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<AppointmentEntity[]> {
    const dateGte = new Date(year, month - 1, day);
    const dateLt = new Date(year, month - 1, day + 1);

    const appointmentsDb = await prisma.appointments.findMany({
      where: {
        provider_id: providerId,
        date: { gte: dateGte, lt: dateLt },
      },
    });

    const appointmentsEntity = appointmentsDb.map(item =>
      AppointmentEntity.create(
        {
          createdAt: item.created_at,
          date: item.date,
          providerId: item.provider_id ?? '',
          updatedAt: item.updated_at,
          userId: item.user_id ?? '',
        },
        item.id,
      ),
    );

    return appointmentsEntity;
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<AppointmentEntity | undefined> {
    const findAppointment = await prisma.appointments.findFirst({
      where: {
        date,
        provider_id: providerId,
      },
    });

    if (!findAppointment) return undefined;

    return AppointmentEntity.create(
      {
        createdAt: findAppointment.created_at,
        date: findAppointment.date,
        providerId: findAppointment.provider_id ?? '',
        updatedAt: findAppointment.updated_at,
        userId: findAppointment.user_id ?? '',
      },
      findAppointment.id,
    );
  }
}
