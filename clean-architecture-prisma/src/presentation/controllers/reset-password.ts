import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  token: string;
  password: string;
};

export default class ResetPasswordController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { token, password } = request;

    const result = await this.useCase.perform({ token, password });

    return ok(result);
  }
}
