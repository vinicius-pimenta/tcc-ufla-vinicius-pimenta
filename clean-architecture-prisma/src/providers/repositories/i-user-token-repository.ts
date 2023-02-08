import { UserTokenEntity } from '@entities/userToken';

export default interface IUserTokenRepository {
  generate(userId: string): Promise<UserTokenEntity>;
  getByToken(token: string): Promise<UserTokenEntity | undefined>;
}
