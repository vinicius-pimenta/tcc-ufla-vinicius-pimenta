import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { adaptRoute } from '@main/config/adapt-route';
import { makeResetPasswordController } from '@main/factories/reset-password-controller';
import { makeForgotPasswordController } from '@main/factories/forgot-password-controller';

export default (router: Router): void => {
  router.post(
    '/forgot',
    celebrate({
      [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
      }).required(),
    }),
    adaptRoute(makeForgotPasswordController()),
  );

  router.post(
    '/reset',
    celebrate({
      [Segments.BODY]: Joi.object({
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
      }).required(),
    }),
    adaptRoute(makeResetPasswordController()),
  );
};
