import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  email: string;
};

export default class ForgotPasswordController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { email } = request;

    await this.useCase.perform({ email });

    return ok(true);
  }
}
