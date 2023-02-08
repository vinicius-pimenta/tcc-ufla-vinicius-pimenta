import ensureAuthentication from 'presentation/middlewares/ensure-authentication';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { adaptRoute } from '@main/config/adapt-route';
import { makeShowUserController } from '@main/factories/show-user-controller';
import { makeUpdateUserController } from '@main/factories/update-user-controller';

export default (router: Router): void => {
  router.get(
    '/profile',
    ensureAuthentication,
    celebrate({
      [Segments.BODY]: {
        userId: Joi.string().uuid().required(),
      },
    }),
    adaptRoute(makeShowUserController()),
  );

  router.put(
    '/profile',
    ensureAuthentication,
    celebrate({
      [Segments.BODY]: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          oldPassword: Joi.string(),
          password: Joi.string(),
          confirmPassword: Joi.string(),
        })
        .with('oldPassword', ['password', 'confirmPassword'])
        .required(),
    }),
    adaptRoute(makeUpdateUserController()),
  );
};
