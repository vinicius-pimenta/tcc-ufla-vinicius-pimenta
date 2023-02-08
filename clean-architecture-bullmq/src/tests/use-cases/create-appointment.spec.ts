// PRECISA estar antes do serviço para não tentar injeção
import AppError from '@shared/errors/app-error';

import CreateAppointmentUseCase from '@use-cases/create-appointment';
import { makeDateProvider } from '@main/factories/date-fns';

import FakeCacheProvider from '@providers/cache/impl/fake-cache-provider';
import FakeAppointmentRepository from '@providers/repositories/fakes/fake-appointments-repository';
import IDateProvider from '@providers/date/i-date-provider';
import { AppointmentEntity } from '@entities/appointments';

let createAppointmentUseCase: CreateAppointmentUseCase;
let cacheProvider: FakeCacheProvider;
let appointmentsRepository: FakeAppointmentRepository;
let dateProvider: IDateProvider;
let uuid: string;

describe('CreateAppointment', () => {
  uuid = 'b08aa88f-7bcf-4bbf-9776-2b15965097c9';

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    cacheProvider = new FakeCacheProvider();
    dateProvider = makeDateProvider();
    createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentsRepository,
      cacheProvider,
      dateProvider,
    );
  });
  it('Deve criar um novo agendamento', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 13, 10).getTime());

    const appointment = await createAppointmentUseCase.perform({
      date: new Date(2020, 4, 16, 9),
      userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      providerId: uuid,
    });

    if (appointment instanceof AppointmentEntity) {
      expect(appointment).toHaveProperty('providerId');
      expect(appointment).toHaveProperty('date');
      expect(appointment.providerId).toBe(uuid);
    }
  });

  it('Não deve criar dois agendamentos no mesmo dia', async () => {
    const appointmentDate = new Date(2020, 4, 13, 13);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 4, 13, 10).getTime());

    await createAppointmentUseCase.perform({
      date: appointmentDate,
      userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      providerId: uuid,
    });

    expect(
      createAppointmentUseCase.perform({
        date: appointmentDate,
        providerId: uuid,
        userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve criar agendamentos em datas que já passaram', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 13, 16).getTime());

    await expect(
      createAppointmentUseCase.perform({
        date: new Date(2020, 4, 13, 11),
        providerId: uuid,
        userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve criar agendamentos fora do horário de atendimento (08:00-17:00)', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 12, 16).getTime());

    await expect(
      createAppointmentUseCase.perform({
        date: new Date(2020, 4, 13, 7),
        providerId: uuid,
        userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointmentUseCase.perform({
        date: new Date(2020, 4, 13, 18),
        providerId: uuid,
        userId: 'ff792db0-1323-4e6f-b190-69d9ada9c969',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
