import FakeCacheProvider from '@providers/cache/impl/FakeCacheProvider';
import FakeAppointmentRepository from '@repositories/fakes/FakeAppointmentsRepository';
import IUserRepository from '@repositories/IUserRepository';
import ProviderService from '@services/provider.service';
import { randomUUID } from 'crypto';

let appointmentsRepository: FakeAppointmentRepository;
let listProviderAppointments: ProviderService;
let cacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    cacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ProviderService(
      {} as IUserRepository,
      cacheProvider,
      appointmentsRepository,
    );
  });
  it('Deve mostrar os agendamentos de um determinado prestador', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 15, 8).getTime());
    const app1 = await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 9),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });
    const app2 = await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 13),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });
    const app3 = await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 15),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });
    const app4 = await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 10),
      provider_id: 'another-provider-id',
      user_id: 'user-id',
    });
    const app5 = await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 11),
      provider_id: 'another-provider-id',
      user_id: 'user-id',
    });

    const appointments =
      await listProviderAppointments.findAllAppointmentsInDay({
        providerId: 'provider-id',
        day: 15,
        month: 9,
        year: 2020,
      });
    expect(appointments).toEqual([app1, app2, app3]);
    expect(appointments).not.toEqual([app4, app5]);
  });

  it('Deve não mostrar agendamentos caso não tenham sido marcados', async () => {
    await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 15),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });
    await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 12),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });
    await appointmentsRepository.save({
      created_at: new Date(),
      updated_at: new Date(),
      id: randomUUID(),
      date: new Date(2020, 8, 15, 9),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 15, 16).getTime());

    const appointments = await listProviderAppointments.findByDayAvailability({
      providerId: 'another-provider-id',
      day: 15,
      month: 9,
      year: 2020,
    });

    expect(appointments).not.toEqual(
      expect.arrayContaining([{ available: true }]),
    );
  });
});
