import { user_tokens } from '@prisma/client';

import { v4 as uuid } from 'uuid';

import IUserTokenRepository from '../IUserTokenRepository';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: user_tokens[] = [];

  async generate(userId: string): Promise<user_tokens> {
    const user = {
      user_id: userId,
      id: uuid(),
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.tokens.push(user);

    return user;
  }

  async getByToken(token: string): Promise<user_tokens | undefined> {
    return this.tokens.find(element => element.token === token);
  }
}

export default FakeUserTokenRepository;
