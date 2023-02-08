import { UserEntity } from '@entities/userEntity';
import IFindAllProvidersDTO from '@providers/repositories/dtos/i-find-all-providers';
import IUserRepository from '@providers/repositories/i-user-repository';
import { prisma } from '@shared/infra/database/prisma';

class UserRepository implements IUserRepository {
  public async save(data: UserEntity): Promise<UserEntity> {
    const userModel = {
      email: data.email,
      name: data.name,
      password: data.password,
      avatar: data.avatar,
      created_at: data.createdAt,
      id: data.id,
      updated_at: data.updatedAt,
    };
    await prisma.users.upsert({
      create: userModel,
      update: userModel,
      where: { id: userModel.id },
    });

    return data;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) return null;

    return UserEntity.create(
      {
        createdAt: user.created_at,
        email: user.email,
        name: user.name,
        password: user.password,
        updatedAt: user.updated_at,
        avatar: user.avatar ?? undefined,
      },
      user.id,
    );
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.users.findUnique({ where: { id } });

    if (!user) return null;

    return UserEntity.create(
      {
        createdAt: user.created_at,
        email: user.email,
        name: user.name,
        password: user.password,
        updatedAt: user.updated_at,
        avatar: user.avatar ?? undefined,
      },
      user.id,
    );
  }

  public async findAllProviders({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<UserEntity[]> {
    const usersDb = await prisma.users.findMany({
      where: {
        NOT: { id: excludeUserId },
      },
    });

    return usersDb.map(item =>
      UserEntity.create(
        {
          createdAt: item.created_at,
          email: item.email,
          name: item.name,
          password: item.password,
          updatedAt: item.updated_at,
          avatar: item.avatar ?? undefined,
        },
        item.id,
      ),
    );
  }
}

export default UserRepository;
