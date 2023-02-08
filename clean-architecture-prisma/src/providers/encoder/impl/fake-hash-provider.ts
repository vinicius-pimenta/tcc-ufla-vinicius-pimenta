import { IEncoder } from '@providers/encoder/i-encoder';

class FakeHashProvider implements IEncoder {
  async encode(payload: string): Promise<string> {
    return payload;
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
