import { prisma } from '@shared/infra/database/prisma';
import { UserTokenEntity } from '@entities/userToken';
import UuidProvider from '@providers/uuid/uuid-provider';
import IUserTokenRepository from '../i-user-token-repository';

class UserTokenRepository implements IUserTokenRepository {
  async generate(userId: string): Promise<UserTokenEntity> {
    const userToken = UserTokenEntity.create({
      token: UuidProvider.generate(),
      user_id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await prisma.user_tokens.create({ data: userToken });

    return userToken;
  }

  async getByToken(token: string): Promise<any> {
    const userTokenModel = await prisma.user_tokens.findFirst({
      where: { token },
    });

    if (!userTokenModel) return null;

    const userTokenEntity = UserTokenEntity.create(
      {
        createdAt: userTokenModel.created_at,
        token: userTokenModel.token,
        updatedAt: userTokenModel.updated_at,
        user_id: userTokenModel.user_id,
      },
      userTokenModel.id,
    );

    return userTokenEntity;
  }
}

export default UserTokenRepository;
