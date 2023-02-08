import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = { providerId: string; date: Date; userId: string };

export default class CreateAppointmentsController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { providerId, date, userId } = request;

    const result = await this.useCase.perform({
      providerId,
      userId,
      date: new Date(date),
    });

    return ok(result);
  }
}
