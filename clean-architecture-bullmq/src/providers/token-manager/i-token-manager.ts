export type Payload = {
  id: string;
};

export interface ITokenManager {
  sign(info: Payload, expiresIn?: string): Promise<string>;
  verify(token: string): Promise<Payload>;
}
