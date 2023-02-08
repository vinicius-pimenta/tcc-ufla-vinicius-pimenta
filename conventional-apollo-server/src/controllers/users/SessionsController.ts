import { container } from 'tsyringe';
import AuthService from '@services/auth.service';
import { HttpResponse, ok } from '@config/http-response';

type Request = {
  email: string;
  password: string;
};

export default class SessionsController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { email, password } = request;

    const service = container.resolve(AuthService);

    const { user, token } = await service.login({ email, password });

    return ok({ user, token });
  }
}
