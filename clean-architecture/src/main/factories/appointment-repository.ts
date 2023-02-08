import IAppointmentRepository from '@providers/repositories/i-appointment-repository';
import PostgreSQLAppointmentRepository from '@providers/repositories/typeorm/appointment-repository';

export const makeAppointmentRepository = (): IAppointmentRepository => {
  return new PostgreSQLAppointmentRepository();
};
