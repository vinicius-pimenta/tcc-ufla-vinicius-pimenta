import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  userId: string;
};

class ListProvidersController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request): Promise<HttpResponse> {
    const { userId } = request;

    const providers = await this.useCase.perform({ excludeUserId: userId });

    return ok(providers);
  }
}

export default ListProvidersController;
