import { Router } from 'express';

import { adaptRoute } from '@main/config/adapt-route';
import { makeCreateAppointmentsController } from '@main/factories/create-appointments-controller';

import ensureAuthentication from '@presentation/middlewares/ensure-authentication';
import { makeListProviderAppointmentsController } from '@main/factories/list-provider-appointments-controller';

export default (router: Router): void => {
  router.post(
    '/appointments',
    ensureAuthentication,
    adaptRoute(makeCreateAppointmentsController()),
  );

  router.get(
    '/appointments/me',
    ensureAuthentication,
    adaptRoute(makeListProviderAppointmentsController()),
  );
};
