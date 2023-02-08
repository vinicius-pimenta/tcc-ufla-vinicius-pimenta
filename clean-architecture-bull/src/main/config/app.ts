import 'express-async-errors';
import uploadConfig from 'main/config/upload';
import AppError from '@shared/errors/app-error';
// import rateLimiter from 'presentation/middlewares/rate-limiter';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import setupRoutes from './setup-routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
// app.use(rateLimiter);

setupRoutes(app);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: error.message });
  },
);

export default app;
