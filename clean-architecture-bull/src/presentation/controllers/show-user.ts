import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  userId: string;
};

export default class ShowUserController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request): Promise<HttpResponse> {
    const { userId } = request;

    const result = await this.useCase.perform(userId);

    return ok(result);
  }
}
