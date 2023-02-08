import AppError from '@shared/errors/app-error';
import ICacheProvider from '@providers/cache/i-cache-provider';
import IAppointmentRepository from '@providers/repositories/i-appointment-repository';

import IDateProvider from '@providers/date/i-date-provider';
import { AppointmentEntity } from '@entities/appointments';
import ICreateAppointmentDTO from '@providers/repositories/dtos/i-create-appointment';

class CreateAppointmentUseCase {
  private appointmentRepository: IAppointmentRepository;

  private cacheProvider: ICacheProvider;

  private dateProvider: IDateProvider;

  constructor(
    appointmentRepository: IAppointmentRepository,
    cacheProvider: ICacheProvider,
    dateProvider: IDateProvider,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.cacheProvider = cacheProvider;
    this.dateProvider = dateProvider;
  }

  public async perform({
    providerId,
    date,
    userId,
  }: ICreateAppointmentDTO): Promise<AppointmentEntity | AppError> {
    const parsedDate = this.dateProvider.startOfHour({ date });

    if (
      this.dateProvider.isBefore({ date: parsedDate, dateCompare: Date.now() })
    ) {
      throw new AppError('Esse horário é inválido pois ele já passou.');
    }

    const hour = this.dateProvider.getHours({ date: parsedDate });

    if (hour < 8 || hour > 17) {
      throw new AppError('Fora do horário de trabalho (entre 08:00 até 17:00)');
    }

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(parsedDate, providerId);

    if (findAppointmentInSameDate) {
      throw new AppError('Esse horário já foi agendado');
    }

    const appointmentEntity = AppointmentEntity.create({
      providerId,
      userId,
      date: parsedDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const appointment = await this.appointmentRepository.save(
      appointmentEntity,
    );

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${this.dateProvider.format({
        date: parsedDate,
        formatParams: 'yyyy-M-d',
      })}`,
    );

    return appointment;
  }
}

export default CreateAppointmentUseCase;
