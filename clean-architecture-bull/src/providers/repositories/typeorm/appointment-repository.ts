import IFindAllAppointmentInDay from '@providers/repositories/dtos/i-find-all-appointment-in-day';
import IFindAppointmentsInMonthDTO from '@providers/repositories/dtos/i-find-appointments-in-month';
import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import { Raw } from 'typeorm';

import Appointment from '@providers/repositories/typeorm/entities/appointment';
import { AppointmentEntity } from '@entities/appointments';
import { PgRepository } from './helpers/repository';
import { AppointmentMapper } from './mappers/appointments';

export default class AppointmentRepository
  extends PgRepository
  implements IAppointmentRepository
{
  public async save(
    appointmentEntity: AppointmentEntity,
  ): Promise<AppointmentEntity> {
    const ormRepository = this.getRepository(Appointment);
    const appointment = await ormRepository.save({
      providerId: appointmentEntity.providerId,
      date: appointmentEntity.date,
      userId: appointmentEntity.userId,
    });

    return AppointmentMapper.toDomain({
      createdAt: appointment.createdAt,
      date: appointment.date,
      id: appointment.id,
      providerId: appointment.providerId,
      updatedAt: appointment.updatedAt,
      userId: appointment.userId,
    });
  }

  public async findInMonth({
    providerId,
    year,
    month,
  }: IFindAppointmentsInMonthDTO): Promise<AppointmentEntity[]> {
    const ormRepository = this.getRepository(Appointment);
    const parsedMonth = month.toString().padStart(2, '0');
    const appointmentsModel = await ormRepository.find({
      where: {
        providerId,
        date: Raw(
          fieldName =>
            `to_char(${fieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    const appointmentsEntity = appointmentsModel.map(e =>
      AppointmentMapper.toDomain({
        createdAt: e.createdAt,
        date: e.date,
        id: e.id,
        providerId: e.providerId,
        updatedAt: e.updatedAt,
        userId: e.userId,
      }),
    );

    return appointmentsEntity;
  }

  public async findAllInDay({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<AppointmentEntity[]> {
    const ormRepository = this.getRepository(Appointment);
    const parsedMonth = month.toString().padStart(2, '0');
    const parsedDay = day.toString().padStart(2, '0');
    const appointmentsModel = await ormRepository.find({
      where: {
        providerId,
        date: Raw(
          fieldName =>
            `to_char(${fieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      order: {
        date: 'ASC',
      },
      relations: ['user'],
    });

    const appointmentsEntity = appointmentsModel.map(e =>
      AppointmentMapper.toDomain({
        createdAt: e.createdAt,
        date: e.date,
        id: e.id,
        providerId: e.providerId,
        updatedAt: e.updatedAt,
        userId: e.userId,
      }),
    );
    return appointmentsEntity;
  }

  public async findByDate(
    date: Date,
    providerId: string,
  ): Promise<AppointmentEntity | undefined> {
    const ormRepository = this.getRepository(Appointment);
    const findAppointment = await ormRepository.findOne({
      where: {
        date,
        providerId,
      },
      relations: ['user'],
    });

    if (!findAppointment) return undefined;

    return AppointmentMapper.toDomain({
      createdAt: findAppointment.createdAt,
      date: findAppointment.date,
      id: findAppointment.id,
      providerId: findAppointment.providerId,
      updatedAt: findAppointment.updatedAt,
      userId: findAppointment.userId,
    });
  }
}
