import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  userId: string;
  day: string;
  month: string;
  year: string;
};

export default class ListProviderAppointmentsController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request): Promise<HttpResponse> {
    const { day, month, year, userId } = request;

    const appointments = await this.useCase.perform({
      providerId: userId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return ok(appointments);
  }
}
