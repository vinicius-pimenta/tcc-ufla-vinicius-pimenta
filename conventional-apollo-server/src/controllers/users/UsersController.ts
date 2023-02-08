import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import UserService from '@services/user.service';
import { HttpResponse, ok } from '@config/http-response';

type Request = {
  name: string;
  email: string;
  password: string;
};

export default class UsersController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { name, email, password } = request;

    const service = container.resolve(UserService);

    const user = await service.createUser({ name, email, password });

    return ok(classToClass(user));
  }
}
