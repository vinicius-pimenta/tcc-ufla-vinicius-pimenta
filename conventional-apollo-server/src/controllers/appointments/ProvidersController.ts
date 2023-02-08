import { HttpResponse, ok } from '@config/http-response';
import ProviderService from '@services/provider.service';
import { container } from 'tsyringe';

type Request = {
  userId: string;
};

class ProvidersController {
  async handle(request: Request): Promise<HttpResponse> {
    const { userId } = request;

    const service = container.resolve(ProviderService);

    const providers = await service.getProviders({ excludeUserId: userId });

    return ok(providers);
  }
}

export default ProvidersController;
