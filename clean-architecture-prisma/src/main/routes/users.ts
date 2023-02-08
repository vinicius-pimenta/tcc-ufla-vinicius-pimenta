import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { adaptRoute } from '@main/config/adapt-route';
import { makeCreateUserController } from '@main/factories/create-user-controller';
import ensureAuthentication from 'presentation/middlewares/ensure-authentication';
import multer from 'multer';
import config from 'main/config/upload';
import { makeUpdateAvatarController } from '@main/factories/update-avatar-controller';

export default (router: Router): void => {
  const upload = multer(config.multer);

  router.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    adaptRoute(makeUpdateAvatarController()),
  );

  router.post(
    '/users',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
      },
    }),
    // measureExecutionTime('../execucoes/criar-conta-semddd.txt'),
    adaptRoute(makeCreateUserController()),
  );
};
