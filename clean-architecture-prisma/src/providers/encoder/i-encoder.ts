export interface IEncoder {
  encode(plain: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
