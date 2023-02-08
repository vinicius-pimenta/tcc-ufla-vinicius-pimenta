import DateFnsProvider from '@providers/date/impl/date-fns';
import IDateProvider from '@providers/date/i-date-provider';

export const makeDateProvider = (): IDateProvider => {
  return new DateFnsProvider();
};
