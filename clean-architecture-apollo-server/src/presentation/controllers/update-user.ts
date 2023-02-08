import { HttpResponse, ok } from '@main/config/http-response';
import { IUseCase } from '@use-cases/ports/i-use-case';

type Request = {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  userId: string;
};

export default class UpdateUserController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  async handle(request: Request): Promise<HttpResponse> {
    const { name, email, password, oldPassword, userId } = request;

    const result = await this.useCase.perform({
      userId,
      name,
      email,
      password,
      oldPassword,
    });

    return ok(result);
  }
}
