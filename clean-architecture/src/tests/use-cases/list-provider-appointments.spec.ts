import FindAllAppointmentsInDayUseCase from '@use-cases/find-all-appointments-in-day';
import FakeCacheProvider from '@providers/cache/impl/fake-cache-provider';
import FakeAppointmentRepository from '@providers/repositories/fakes/fake-appointments-repository';
import { AppointmentEntity } from '@entities/appointments';

let appointmentsRepository: FakeAppointmentRepository;
let cacheProvider: FakeCacheProvider;
let findAllAppointmentsInDayUseCase: FindAllAppointmentsInDayUseCase;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    cacheProvider = new FakeCacheProvider();
    findAllAppointmentsInDayUseCase = new FindAllAppointmentsInDayUseCase(
      appointmentsRepository,
      cacheProvider,
    );
  });
  it('Deve mostrar os agendamentos de um determinado prestador', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 15, 8).getTime());

    const app1 = await appointmentsRepository.save(
      AppointmentEntity.create({
        date: new Date(2020, 8, 15, 9),
        providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
        userId: 'dfc2a450-978d-4408-9471-08c660f16075',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const app2 = await appointmentsRepository.save(
      AppointmentEntity.create({
        date: new Date(2020, 8, 15, 13),
        providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
        userId: 'dfc2a450-978d-4408-9471-08c660f16075',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const app3 = await appointmentsRepository.save(
      AppointmentEntity.create({
        date: new Date(2020, 8, 15, 15),
        providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
        userId: 'dfc2a450-978d-4408-9471-08c660f16075',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const app4 = await appointmentsRepository.save(
      AppointmentEntity.create({
        date: new Date(2020, 8, 15, 10),
        providerId: '28faefc3-02a4-4eef-973b-229a5fe5b95c',
        userId: 'dfc2a450-978d-4408-9471-08c660f16075',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const app5 = await appointmentsRepository.save(
      AppointmentEntity.create({
        date: new Date(2020, 8, 15, 11),
        providerId: '28faefc3-02a4-4eef-973b-229a5fe5b95c',
        userId: 'dfc2a450-978d-4408-9471-08c660f16075',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const appointments = await findAllAppointmentsInDayUseCase.perform({
      providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
      day: 15,
      month: 9,
      year: 2020,
    });

    expect(appointments).toEqual([app1, app2, app3]);
    expect(appointments).not.toEqual([app4, app5]);
  });

  it('Deve não mostrar agendamentos caso não tenham sido marcados', async () => {
    await appointmentsRepository.save({
      date: new Date(2020, 8, 15, 15),
      providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
      userId: 'dfc2a450-978d-4408-9471-08c660f16075',
    });

    await appointmentsRepository.save({
      date: new Date(2020, 8, 15, 12),
      providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
      userId: 'dfc2a450-978d-4408-9471-08c660f16075',
    });

    await appointmentsRepository.save({
      date: new Date(2020, 8, 15, 9),
      providerId: '53b357ca-7244-451b-bfb2-7038b5c3cffb',
      userId: 'dfc2a450-978d-4408-9471-08c660f16075',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 15, 16).getTime());

    const appointments = await findAllAppointmentsInDayUseCase.perform({
      providerId: '28faefc3-02a4-4eef-973b-229a5fe5b95c',
      day: 15,
      month: 9,
      year: 2020,
    });

    expect(appointments).not.toEqual(
      expect.arrayContaining([{ available: true }]),
    );
  });
});
