import { IUseCase } from '@use-cases/ports/i-use-case';
import { HttpResponse, badRequest, ok } from '@main/config/http-response';
import AppError from '@shared/errors/app-error';

type Request = {
  email: string;
  password: string;
};

export default class AuthenticateUserController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { email, password } = request;

    const result = await this.useCase.perform({ email, password });

    if (result instanceof AppError) return badRequest(result);

    return ok(result);
  }
}
