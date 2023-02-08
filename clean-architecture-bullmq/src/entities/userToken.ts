import AppError from '@shared/errors/app-error';
import { Entity } from './entity';

export type UserTokenProps = {
  token: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserTokenEntity extends Entity<UserTokenProps> {
  private constructor(props: UserTokenProps, id?: string) {
    super(props, id);
  }

  get token() {
    return this.props.token;
  }

  get user_id() {
    return this.props.user_id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(props: UserTokenProps, id?: string): UserTokenEntity {
    if (props.token == null) {
      throw new AppError('token field is mandatory');
    }
    if (props.user_id == null) {
      throw new AppError('user_id field is mandatory');
    }
    if (!props.createdAt) {
      throw new AppError('createdAt field is mandatory');
    }
    if (!props.updatedAt) {
      throw new AppError('updatedAt field is mandatory');
    }

    const userTokenEntity = new UserTokenEntity(
      {
        token: props.token,
        user_id: props.user_id,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      id,
    );

    return userTokenEntity;
  }
}
