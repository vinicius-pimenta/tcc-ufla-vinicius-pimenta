import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UserService from '@services/user.service';
import { HttpResponse, ok } from '@config/http-response';

type ShowRequest = {
  userId: string;
};

type UpdateRequest = {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  userId: string;
};

export default class ProfileController {
  async handle(request: ShowRequest): Promise<HttpResponse> {
    const { userId } = request;

    const service = container.resolve(UserService);

    const user = await service.get(userId);

    return ok(classToClass(user));
  }

  async update(request: UpdateRequest): Promise<HttpResponse> {
    const { name, email, password, oldPassword, userId } = request;

    const service = container.resolve(UserService);

    const result = await service.update(userId, {
      name,
      email,
      password,
      oldPassword,
    });

    return ok(classToClass(result));
  }
}
