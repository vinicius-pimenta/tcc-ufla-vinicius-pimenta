import config from '@main/config/auth';
import { JwtTokenManager } from '@providers/token-manager/impl/jwt-token-manager';
import { ITokenManager } from '@providers/token-manager/i-token-manager';

export const makeTokenManager = (): ITokenManager => {
  return new JwtTokenManager(config.jwt.secret);
};
