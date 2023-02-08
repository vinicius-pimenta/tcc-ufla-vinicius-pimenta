import { users as UserModel } from '@prisma/client';
import IFindAllProvidersDTO from './dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  save(data: UserModel): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: string): Promise<UserModel | null>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<UserModel[]>;
}
