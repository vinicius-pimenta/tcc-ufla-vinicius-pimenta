import { HttpResponse, ok } from '@config/http-response';
import ProviderService from '@services/provider.service';
import { container } from 'tsyringe';

type Request = {
  providerId: string;
  day: string;
  month: string;
  year: string;
};

class ProviderDayAvailabilityController {
  public async handle(request: Request): Promise<HttpResponse> {
    const { providerId, year, month, day } = request;

    const service = container.resolve(ProviderService);

    const availability = await service.findByDayAvailability({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return ok(availability);
  }
}

export default ProviderDayAvailabilityController;
