import { UserTokenEntity } from '@entities/userToken';

import { v4 as uuid } from 'uuid';
import IUserTokenRepository from '../i-user-token-repository';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserTokenEntity[] = [];

  async generate(userId: string): Promise<UserTokenEntity> {
    const user = UserTokenEntity.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      token: uuid(),
      user_id: userId,
    });

    this.tokens.push(user);

    return user;
  }

  async getByToken(token: string): Promise<UserTokenEntity | undefined> {
    return this.tokens.find(element => element.token === token);
  }
}

export default FakeUserTokenRepository;
