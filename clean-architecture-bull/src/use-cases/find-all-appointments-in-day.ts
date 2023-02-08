import { AppointmentEntity } from '@entities/appointments';
import ICacheProvider from '@providers/cache/i-cache-provider';
import IAppointmentRepository from '@providers/repositories/i-appointment-repository';

type Input = {
  providerId: string;
  month: number;
  year: number;
  day: number;
};

class FindAllAppointmentInDayUseCase {
  private readonly appointmentRepository: IAppointmentRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    appointmentRepository: IAppointmentRepository,
    cacheProvider: ICacheProvider,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.cacheProvider = cacheProvider;
  }

  public async perform({ providerId, year, month, day }: Input) {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

    let appointmentsDb = await this.cacheProvider.recovery<AppointmentEntity[]>(
      cacheKey,
    );

    if (!appointmentsDb) {
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

export default FindAllAppointmentInDayUseCase;
