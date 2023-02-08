import { AppointmentEntity } from '@entities/appointments';
import FakeAppointmentRepository from '@providers/repositories/fakes/fake-appointments-repository';
import ListProviderDayAvailabilityUseCase from '@use-cases/list-provider-day-availability';

let appointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailabilityUseCase: ListProviderDayAvailabilityUseCase;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    appointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityUseCase = new ListProviderDayAvailabilityUseCase(
      appointmentRepository,
    );
  });
  it('Deve mostrar os horários disponíveis de um prestador em um determinado dia', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 3, 15, 7).getTime());

    await appointmentRepository.save(
      AppointmentEntity.create({
        providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
        userId: '68a3a5e6-f61c-418d-9143-756d99aa5d13',
        date: new Date(2020, 3, 15, 8, 0, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await appointmentRepository.save(
      AppointmentEntity.create({
        providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
        userId: '68a3a5e6-f61c-418d-9143-756d99aa5d13',
        date: new Date(2020, 3, 15, 10, 0, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await appointmentRepository.save(
      AppointmentEntity.create({
        providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
        userId: '68a3a5e6-f61c-418d-9143-756d99aa5d13',
        date: new Date(2020, 3, 15, 12, 0, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await appointmentRepository.save(
      AppointmentEntity.create({
        providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
        userId: '68a3a5e6-f61c-418d-9143-756d99aa5d13',
        date: new Date(2020, 3, 15, 13, 0, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    await appointmentRepository.save(
      AppointmentEntity.create({
        providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
        userId: '68a3a5e6-f61c-418d-9143-756d99aa5d13',
        date: new Date(2020, 3, 15, 16, 0, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const availability = await listProviderDayAvailabilityUseCase.perform({
      providerId: '374e45cc-0d3e-4678-a73e-328a6635518f',
      day: 15,
      month: 4,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: true },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
