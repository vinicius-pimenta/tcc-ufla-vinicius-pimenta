import { PgConnection } from '@providers/repositories/typeorm/helpers/connection';

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance();
};
