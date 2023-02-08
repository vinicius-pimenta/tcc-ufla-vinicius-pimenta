import ICacheProvider from '@providers/cache/i-cache-provider';
import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import IFindAllAppointmentInDay from '@providers/repositories/dtos/i-find-all-appointment-in-day';
import { AppointmentEntity } from '@entities/appointments';

class FindAppointmentUseCase {
  private appointmentRepository: IAppointmentRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    appointmentRepository: IAppointmentRepository,
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.cacheProvider = cacheProvider;
  }

  public async perform({
    providerId,
    day,
    month,
    year,
  }: IFindAllAppointmentInDay): Promise<AppointmentEntity[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

    let appointmentsDb = await this.cacheProvider.recovery<AppointmentEntity[]>(
      cacheKey,
    );

    if (appointmentsDb === null || appointmentsDb?.length === 0) {
      appointmentsDb = await this.appointmentRepository.findAllInDay({
        providerId,
        day,
        month,
        year,
      });

      await this.cacheProvider.save(cacheKey, appointmentsDb);
    }

    return appointmentsDb;
  }
}

export default FindAppointmentUseCase;
