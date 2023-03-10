import UserToken from '@models/UserToken';

import { v4 as uuid } from 'uuid';
import IUserTokenRepository from '../IUserTokenRepository';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  async generate(userId: string): Promise<UserToken> {
    const user = new UserToken();

    Object.assign(user, {
      userId,
      id: uuid(),
      token: uuid(),
      createdAt: new Date(),
    });

    this.tokens.push(user);

    return user;
  }

  async getByToken(token: string): Promise<UserToken | undefined> {
    return this.tokens.find(element => element.token === token);
  }
}

export default FakeUserTokenRepository;
