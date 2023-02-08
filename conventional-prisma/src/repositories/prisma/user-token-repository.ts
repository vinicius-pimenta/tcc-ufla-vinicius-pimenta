import { prisma } from '@database/prisma';
import { user_tokens } from '@prisma/client';
import IUserTokenRepository from '@repositories/IUserTokenRepository';
import { uuid } from 'uuidv4';

class UserTokenRepository implements IUserTokenRepository {
  async generate(userId: string): Promise<user_tokens> {
    const token = {
      created_at: new Date(),
      updated_at: new Date(),
      id: uuid(),
      token: uuid(),
      user_id: userId,
    };

    await prisma.user_tokens.create({
      data: token,
    });

    return token;
  }

  async getByToken(token: string): Promise<any> {
    const userToken = await prisma.user_tokens.findFirst({
      where: { token },
    });

    return userToken;
  }
}

export default UserTokenRepository;
