import FakeAppointmentRepository from '@providers/repositories/fakes/fake-appointments-repository';
import ListProviderMonthAvailabilityUseCase from '@use-cases/list-provider-month-availability';

let appointmentsRepository: FakeAppointmentRepository;
let listProviderMonthAvailabilityUseCase: ListProviderMonthAvailabilityUseCase;
let dateMock: jest.SpyInstance;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityUseCase =
      new ListProviderMonthAvailabilityUseCase(appointmentsRepository);
    dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 1).valueOf());
  });

  afterAll(() => {
    dateMock.mockRestore();
  });

  it('Deve listar a disponibilidade de um prestador em um mês', async () => {
    // não deve sair na relação de dias
    await appointmentsRepository.save({
      providerId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      userId: 'baaaf15b-db35-42f0-ad91-e5a3389b7461',
      date: new Date(2020, 4, 12, 8, 0, 0),
    });

    // enche um dia todo de agendamentos para um provider
    for (let i = 8; i <= 17; i++) {
      await appointmentsRepository.save({
        providerId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
        userId: 'baaaf15b-db35-42f0-ad91-e5a3389b7461',
        date: new Date(2020, 4, 13, i, 0, 0),
      });
    }

    const availability = await listProviderMonthAvailabilityUseCase.perform({
      providerId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: true },
        { day: 13, available: false },
        { day: 14, available: true },
      ]),
    );
  });
});
