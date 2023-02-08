import { AppointmentEntity } from '@entities/appointments';

type AppointmentModel = {
  id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  providerId: string | undefined;
  userId: string | undefined;
};

export class AppointmentMapper {
  static toDomain(appointmentModel: AppointmentModel): AppointmentEntity {
    const { createdAt, date, id, providerId, updatedAt, userId } =
      appointmentModel;

    const appointmentEntity = AppointmentEntity.create(
      {
        createdAt,
        date,
        providerId: providerId ?? '',
        updatedAt,
        userId: userId ?? '',
      },
      id,
    );

    return appointmentEntity;
  }
}
