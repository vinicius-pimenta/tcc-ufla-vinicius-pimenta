import { HttpResponse, ok } from '@config/http-response';
import AppointmentService from '@services/appointment.service';
import { container } from 'tsyringe';

type Request = { providerId: string; date: Date; userId: string };

export default class AppointmentsController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { providerId, date, userId } = request;

    const service = container.resolve(AppointmentService);

    const result = await service.create({
      providerId,
      userId,
      date,
    });

    return ok(result);
  }
}
