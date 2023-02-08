import { users as UserModel } from '@prisma/client';
import { prisma } from '@database/prisma';

import IFindAllProvidersDTO from '@repositories/dtos/IFindAllProvidersDTO';
import IUserRepository from '@repositories/IUserRepository';

class UserRepository implements IUserRepository {
  public async save(data: UserModel): Promise<UserModel> {
    const user = await prisma.users.upsert({
      create: data,
      update: data,
      where: { id: data.id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    const user = await prisma.users.findUnique({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<UserModel | null> {
    const user = await prisma.users.findUnique({ where: { id } });

    return user;
  }

  public async findAllProviders({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<UserModel[]> {
    const usersDb = await prisma.users.findMany({
      where: {
        NOT: { id: excludeUserId },
      },
    });

    return usersDb;
  }
}

export default UserRepository;
