import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  providerId: string;
  month: string;
  year: string;
};

class ListProviderMonthAvailabilityController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { providerId, year, month } = request;

    const availability = await this.useCase.perform({
      providerId,
      month: Number(month),
      year: Number(year),
    });

    return ok(availability);
  }
}

export default ListProviderMonthAvailabilityController;
