import { UserEntity } from '@entities/userEntity';
import User from '@providers/repositories/typeorm/entities/user';

export class UserMapper {
  static toDomain(userModel: User): UserEntity {
    const { avatar, createdAt, email, id, name, password, updatedAt } =
      userModel;

    const userEntity = UserEntity.create(
      {
        avatar,
        createdAt,
        email,
        name,
        password,
        updatedAt,
      },
      id,
    );

    return userEntity;
  }
}
