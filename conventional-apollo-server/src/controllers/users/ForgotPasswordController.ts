import { HttpResponse, ok } from '@config/http-response';
import AuthService from '@services/auth.service';

import { container } from 'tsyringe';

type Request = {
  email: string;
};

export default class ForgotPasswordController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { email } = request;

    const sendForgotPassword = container.resolve(AuthService);

    await sendForgotPassword.forgotPassword({ email });

    return ok(true);
  }
}
