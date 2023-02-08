export default interface IDateProvider {
  startOfHour(params: StartOfHour.Params): StartOfHour.Result;
  isBefore(params: IsBefore.Params): IsBefore.Result;
  getHours(params: GetHours.Params): GetHours.Result;
  format(params: Format.Params): Format.Result;
}

export namespace StartOfHour {
  export type Params = {
    date: number | Date;
  };

  export type Result = Date;
}

export namespace IsBefore {
  export type Params = {
    date: number | Date;
    dateCompare: number | Date;
  };

  export type Result = boolean;
}

export namespace GetHours {
  export type Params = {
    date: number | Date;
  };

  export type Result = number;
}

export namespace Format {
  export type Params = {
    date: number | Date;
    formatParams: string;
    locale?: Locale | undefined;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    firstWeekContainsDate?: number | undefined;
    useAdditionalWeekYearTokens?: boolean | undefined;
    useAdditionalDayOfYearTokens?: boolean | undefined;
  };

  export type Result = string;
}
