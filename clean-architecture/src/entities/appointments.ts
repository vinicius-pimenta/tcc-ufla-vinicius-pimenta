import AppError from '@shared/errors/app-error';
import { Entity } from './entity';

type AppointmentProps = {
  providerId: string;
  userId: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export class AppointmentEntity extends Entity<AppointmentProps> {
  private constructor(props: AppointmentProps, id?: string) {
    super(props, id);
  }

  get providerId() {
    return this.props.providerId;
  }

  get userId() {
    return this.props.userId;
  }

  get date() {
    return this.props.date;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  public static create(
    props: AppointmentProps,
    id?: string,
  ): AppointmentEntity {
    if (props.providerId == null) throw new AppError('providerId field is mandatory');
    if (!props.userId) throw new AppError('userId field is mandatory');
    if (!props.date) throw new AppError('date field is mandatory');
    if (!props.createdAt) throw new AppError('createdAt field is mandatory');
    if (!props.updatedAt) throw new AppError('updatedAt field is mandatory');

    const appointment = new AppointmentEntity(
      {
        providerId: props.providerId,
        userId: props.userId,
        date: props.date,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      },
      id,
    );

    return appointment;
  }
}
