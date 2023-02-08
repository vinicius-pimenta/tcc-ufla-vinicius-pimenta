import AppointmentService from '@services/appointment.service';
import { container } from 'tsyringe';
import { Response, Request } from 'express';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const userId = request.user.id;

    const service = container.resolve(AppointmentService);

    const result = await service.create({
      providerId,
      userId,
      date,
    });

    return response.json(result);
  }
}
