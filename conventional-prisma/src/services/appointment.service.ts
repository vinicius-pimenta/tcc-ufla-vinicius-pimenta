/* eslint-disable no-shadow */
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { classToClass } from 'class-transformer';
import AppError from '@errors/AppError';
import ICacheProvider from '@providers/cache/ICacheProvider';
import IAppointmentRepository from '@repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@repositories/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentInDay from '@repositories/dtos/IFindAllAppointmentInDay';
import { randomUUID } from 'crypto';
import { appointments } from '@prisma/client';

@injectable()
class AppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async create({
    providerId,
    date,
    userId,
  }: ICreateAppointmentDTO): Promise<appointments> {
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError('Esse horário é inválido pois ele já passou.');
    }

    const hour = getHours(parsedDate);

    if (hour < 8 || hour > 17) {
      throw new AppError('Fora do horário de trabalho (entre 08:00 até 17:00)');
    }

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(parsedDate, providerId);
    if (findAppointmentInSameDate) {
      throw new AppError('Esse horário já foi agendado');
    }

    const appointment = await this.appointmentRepository.save({
      provider_id: providerId,
      user_id: userId,
      date: parsedDate,
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
    });

    // const formattedDate = format(parsedDate, "dd/MM/yyyy 'às' HH:mm'h'", {
    //   locale: ptBR,
    // });

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${format(parsedDate, 'yyyy-M-d')}`,
    );

    return appointment;
  }

  public async find({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<appointments[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recovery<appointments[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = classToClass(
        await this.appointmentRepository.findAllInDay({
          providerId,
          day,
          month,
          year,
        }),
      );

      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}

export default AppointmentService;
