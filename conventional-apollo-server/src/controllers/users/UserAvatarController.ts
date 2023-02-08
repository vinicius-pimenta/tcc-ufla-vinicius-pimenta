import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AvatarService from '@services/avatar.service';
import AppError from '@errors/AppError';
import { HttpResponse, ok } from '@config/http-response';

type Request = {
  userId: string;
  filename: string;
};

export default class UserAvatarController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { userId, filename } = request;

    if (!filename) {
      throw new AppError('Invalid uploaded file');
    }

    const updateAvatarService = container.resolve(AvatarService);

    const updatedUser = await updateAvatarService.updateAvatar({
      userId,
      avatarFilename: filename,
    });

    return ok(classToClass(updatedUser));
  }
}
