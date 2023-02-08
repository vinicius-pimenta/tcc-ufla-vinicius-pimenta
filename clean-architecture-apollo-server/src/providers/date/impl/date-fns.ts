import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import IDateProvider, {
  StartOfHour,
  IsBefore,
  GetHours,
  Format,
} from '../i-date-provider';

export default class DateFnsProvider implements IDateProvider {
  startOfHour(params: StartOfHour.Params): StartOfHour.Result {
    return startOfHour(params.date);
  }

  isBefore(params: IsBefore.Params): IsBefore.Result {
    return isBefore(params.date, params.dateCompare);
  }

  getHours(params: GetHours.Params): GetHours.Result {
    return getHours(params.date);
  }

  format(params: Format.Params, localeParams?: string): Format.Result {
    if (localeParams == 'ptBR') {
      params.locale = ptBR;
    }

    return format(params.date, params.formatParams, {
      locale: params.locale,
      weekStartsOn: params.weekStartsOn,
      firstWeekContainsDate: params.firstWeekContainsDate,
      useAdditionalDayOfYearTokens: params.useAdditionalDayOfYearTokens,
      useAdditionalWeekYearTokens: params.useAdditionalWeekYearTokens,
    });
  }
}
