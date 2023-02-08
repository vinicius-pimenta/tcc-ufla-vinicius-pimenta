import { UserEntity } from '@entities/userEntity';
import IFindAllProvidersDTO from './dtos/i-find-all-providers';

export default interface IUserRepository {
  save(data: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<UserEntity[]>;
}
