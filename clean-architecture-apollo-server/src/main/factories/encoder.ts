import { IEncoder } from '@providers/encoder/i-encoder';
import { BcryptJSEncoder } from '@providers/encoder/impl/bcryptjs-encoder';

export const makeEncoder = (): IEncoder => {
  return new BcryptJSEncoder(parseInt(process.env.BCRYPT_ROUNDS ?? '8'));
};
