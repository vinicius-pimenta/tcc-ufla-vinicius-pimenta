import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { adaptRoute } from '@main/config/adapt-route';
import { makeListProviderMonthAvailabilityController } from '@main/factories/list-provider-month-availability-controller';
import { makeListProviderDayAvailabilityController } from '@main/factories/list-provider-day-availability-controller';
import ensureAuthentication from 'presentation/middlewares/ensure-authentication';
import { makeListProvidersController } from '@main/factories/list-providers-controller';

export default (router: Router): void => {
  router.get(
    '/providers',
    // measureExecutionTime('../execucoes/ver-prestadores-semddd.txt'),
    ensureAuthentication,
    adaptRoute(makeListProvidersController()),
  );

  router.get(
    '/providers/:providerId/month-availability',
    ensureAuthentication,
    celebrate({
      [Segments.PARAMS]: {
        providerId: Joi.string().uuid().required(),
      },
      [Segments.QUERY]: {
        year: Joi.number().required(),
        month: Joi.number().required().min(1).max(12),
      },
    }),
    adaptRoute(makeListProviderMonthAvailabilityController()),
  );

  router.get(
    '/providers/:providerId/day-availability',
    ensureAuthentication,
    celebrate({
      [Segments.PARAMS]: Joi.object({
        providerId: Joi.string().uuid().required(),
      }).required(),
      [Segments.QUERY]: Joi.object({
        day: Joi.number().required().min(1).max(31),
        year: Joi.number().required(),
        month: Joi.number().required().min(1).max(12),
      }).required(),
    }),
    adaptRoute(makeListProviderDayAvailabilityController()),
  );
};
