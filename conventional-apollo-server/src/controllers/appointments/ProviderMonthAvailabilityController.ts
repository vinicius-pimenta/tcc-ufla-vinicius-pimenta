import { HttpResponse, ok } from '@config/http-response';
import ProviderService from '@services/provider.service';
import { container } from 'tsyringe';

type Request = {
  providerId: string;
  month: string;
  year: string;
};

class ProviderMonthAvailabilityController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { providerId, year, month } = request;

    const service = container.resolve(ProviderService);

    const availability = await service.findByMonthAvailability({
      providerId,
      month: Number(month),
      year: Number(year),
    });

    return ok(availability);
  }
}

export default ProviderMonthAvailabilityController;
