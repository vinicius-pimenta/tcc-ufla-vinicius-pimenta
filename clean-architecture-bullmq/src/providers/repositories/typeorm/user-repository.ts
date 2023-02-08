import { Not } from 'typeorm';

import User from '@providers/repositories/typeorm/entities/user';
// import ICreateUserDTO from '@providers/repositories/dtos/i-create-user';
import IFindAllProvidersDTO from '@providers/repositories/dtos/i-find-all-providers';
import IUserRepository from '@providers/repositories/i-user-repository';
import { UserEntity } from '@entities/userEntity';
import { PgRepository } from './helpers/repository';
import { UserMapper } from './mappers/user';

class UserRepository extends PgRepository implements IUserRepository {
  public async save(userEntity: UserEntity): Promise<UserEntity> {
    const ormRepository = this.getRepository(User);
    const user = await ormRepository.create(userEntity);
    const userModel = await ormRepository.save(user);

    return UserMapper.toDomain(userModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const ormRepository = this.getRepository(User);
    const userModel = await ormRepository.findOne({ where: { email } });
    if (!userModel) return null;

    return UserMapper.toDomain(userModel);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const ormRepository = this.getRepository(User);
    const userModel = await ormRepository.findOne(id);
    if (!userModel) return null;

    return UserMapper.toDomain(userModel);
  }

  public async findAllProviders({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<UserEntity[]> {
    const ormRepository = this.getRepository(User);
    let users: User[];
    if (excludeUserId) {
      users = await ormRepository.find({
        where: {
          id: Not(excludeUserId),
        },
      });
    } else {
      users = await ormRepository.find();
    }

    return users.map(e => UserMapper.toDomain(e));
  }
}

export default UserRepository;
