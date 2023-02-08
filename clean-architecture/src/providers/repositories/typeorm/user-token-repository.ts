import UserToken from '@providers/repositories/typeorm/entities/user-token';
import IUserTokenRepository from '@providers/repositories/i-user-token-repository';
import { UserTokenEntity } from '@entities/userToken';
import { PgRepository } from './helpers/repository';

export default class UserTokenRepository
  extends PgRepository
  implements IUserTokenRepository
{
  async generate(userId: string): Promise<UserTokenEntity> {
    const ormRepository = this.getRepository(UserToken);
    const userTokenModel = ormRepository.create({ userId });

    await ormRepository.save(userTokenModel);

    const userToken = UserTokenEntity.create({
      createdAt: userTokenModel.createdAt,
      token: userTokenModel.token,
      updatedAt: userTokenModel.updatedAt,
      user_id: userTokenModel.userId,
    });

    return userToken;
  }

  async getByToken(token: string): Promise<UserTokenEntity | undefined> {
    const ormRepository = this.getRepository(UserToken);
    const userTokenModel = await ormRepository.findOne({ where: { token } });

    if (!userTokenModel) return userTokenModel;

    const userToken = UserTokenEntity.create({
      createdAt: userTokenModel.createdAt,
      token: userTokenModel.token,
      updatedAt: userTokenModel.updatedAt,
      user_id: userTokenModel.userId,
    });

    return userToken;
  }
}
