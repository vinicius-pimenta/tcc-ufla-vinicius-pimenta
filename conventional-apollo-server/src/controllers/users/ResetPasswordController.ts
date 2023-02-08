import { container } from 'tsyringe';
import AuthService from '@services/auth.service';
import { HttpResponse, ok } from '@config/http-response';

type Request = {
  token: string;
  password: string;
};

export default class ResetPasswordController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { token, password } = request;
    const resetPassword = container.resolve(AuthService);

    await resetPassword.resetPassword({ token, password });

    return ok(true);
  }
}
