import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import PostgreSQLUserTokenRepository from '@providers/repositories/prisma/user-token-repository';

export const makeUserTokenRepository = (): IUserTokenRepository => {
  return new PostgreSQLUserTokenRepository();
};
