import {
  Payload,
  ITokenManager,
} from '@providers/token-manager/i-token-manager';
import * as jwt from 'jsonwebtoken';

export class JwtTokenManager implements ITokenManager {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async sign(info: Payload, expires?: string): Promise<string> {
    if (expires) {
      return jwt.sign(info, this.secret, { expiresIn: expires });
    }
    return jwt.sign(info, this.secret, { expiresIn: '30d' });
  }

  async verify(token: string): Promise<Payload> {
    const decoded = jwt.verify(token, this.secret) as Payload;
    return decoded;
  }
}
