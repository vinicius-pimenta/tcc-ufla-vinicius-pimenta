import { IEncoder } from '@providers/encoder/i-encoder';
import * as bcrypt from 'bcryptjs';

export class BcryptJSEncoder implements IEncoder {
  private readonly rounds: number = 10;

  constructor(rounds: number) {
    this.rounds = rounds;
  }

  async encode(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}
