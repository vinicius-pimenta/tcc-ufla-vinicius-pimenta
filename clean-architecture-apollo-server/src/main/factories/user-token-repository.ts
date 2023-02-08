import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import PostgreSQLUserTokenRepository from '@providers/repositories/typeorm/user-token-repository';

export const makeUserTokenRepository = (): IUserTokenRepository => {
  return new PostgreSQLUserTokenRepository();
};
