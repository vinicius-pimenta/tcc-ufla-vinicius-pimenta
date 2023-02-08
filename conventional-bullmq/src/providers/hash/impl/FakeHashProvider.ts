import IHashProvider from '../IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
