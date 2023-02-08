import { appointments } from '@prisma/client';
import IFindAllAppointmentInDay from './dtos/IFindAllAppointmentInDay';
import IFindAppointmentsInMonthDTO from './dtos/IFIndAppointmentsInMonthDTO';

export default interface IAppointmentRepository {
  save(data: appointments): Promise<appointments>;
  findByDate(date: Date, providerId: string): Promise<appointments | null>;
  findInMonth(data: IFindAppointmentsInMonthDTO): Promise<appointments[]>;
  findAllInDay(data: IFindAllAppointmentInDay): Promise<appointments[]>;
}
