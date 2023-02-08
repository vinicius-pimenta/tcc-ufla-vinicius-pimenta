import { PgConnection } from '@providers/repositories/typeorm/helpers/connection';
import 'dotenv/config';
import 'reflect-metadata';

import app from './config/app';

PgConnection.getInstance()
  .connect()
  .then(() =>
    app.listen(3333, () => console.log('🚀 Server started on port 3333!')),
  )
  .catch(console.error);
