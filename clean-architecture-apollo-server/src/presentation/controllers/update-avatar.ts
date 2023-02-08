import AppError from '@shared/errors/app-error';
import { IUseCase } from '@use-cases/ports/i-use-case';
import { HttpResponse, ok } from '@main/config/http-response';

type Request = {
  userId: string;
  filename: string;
};

export default class UpdateAvatarController {
  private readonly useCase: IUseCase;

  constructor(useCase: IUseCase) {
    this.useCase = useCase;
  }

  public async handle(request: Request): Promise<HttpResponse> {
    const { userId, filename } = request;

    if (!filename) {
      throw new AppError('Invalid uploaded file');
    }

    const updatedUser = await this.useCase.perform({
      userId,
      avatarFilename: filename,
    });

    return ok(updatedUser);
  }
}
