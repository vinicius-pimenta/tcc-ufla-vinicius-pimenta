import AppError from '@shared/errors/app-error';
import { Entity } from './entity';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  changePassword(newPassword: string) {
    this.props.password = newPassword;
  }

  changeAvatar(newAvatar: string) {
    this.props.avatar = newAvatar;
  }

  changeName(newName: string) {
    this.props.name = newName;
  }

  changeEmail(newEmail: string) {
    this.props.email = newEmail;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatar() {
    return this.props.avatar;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: UserProps, id?: string): UserEntity {
    if (props.name == null) {
      throw new AppError('name field is mandatory');
    }
    if (props.email == null) {
      throw new AppError('email field is mandatory');
    }
    if (props.password == null) {
      throw new AppError('password field is mandatory');
    }
    if (!props.createdAt) {
      throw new AppError('createdAt field is mandatory');
    }
    if (!props.updatedAt) {
      throw new AppError('updatedAt field is mandatory');
    }

    const userEntity = new UserEntity(
      {
        name: props.name,
        email: props.email,
        password: props.password,
        avatar: props.avatar,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      id,
    );

    return userEntity;
  }
}
