import { HttpResponse, badRequest, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';
import AppError from '@shared/errors/app-error';

type Request = {
  name: string;
  email: string;
  password: string;
};

export default class CreateUserController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { name, email, password } = request;

    const result = await this.useCase.perform({ name, email, password });

    if (result instanceof AppError) return badRequest(result);

    return ok(result);
  }
}
