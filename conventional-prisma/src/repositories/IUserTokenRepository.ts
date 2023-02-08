import { user_tokens } from '@prisma/client';

export default interface IUserTokenRepository {
  generate(userId: string): Promise<user_tokens>;
  getByToken(token: string): Promise<user_tokens | undefined>;
}
