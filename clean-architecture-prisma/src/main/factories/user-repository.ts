import IUserRepository from '@providers/repositories/i-user-repository';
import PostgreSQLUserRepository from '@providers/repositories/prisma/user-repository';

export const makeUserRepository = (): IUserRepository => {
  return new PostgreSQLUserRepository();
};
