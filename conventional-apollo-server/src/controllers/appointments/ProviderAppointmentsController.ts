import { HttpResponse, ok } from '@config/http-response';
import AppointmentService from '@services/appointment.service';
import { container } from 'tsyringe';

type Request = {
  userId: string;
  day: string;
  month: string;
  year: string;
};

export default class ProviderAppointmentsController {
  async handle(request: Request): Promise<HttpResponse> {
    const { day, month, year, userId } = request;

    const service = container.resolve(AppointmentService);

    const appointments = await service.find({
      providerId: userId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return ok(appointments);
  }
}
