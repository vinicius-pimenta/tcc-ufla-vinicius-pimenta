import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { makeAuthenticateUserController } from '@main/factories/authenticate-user-controller';
import { adaptRoute } from '@main/config/adapt-route';

export default (router: Router): void => {
  router.post(
    '/sessions',
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).required(),
    }),
    adaptRoute(makeAuthenticateUserController()),
  );
};
