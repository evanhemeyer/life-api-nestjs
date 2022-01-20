import { Either, Option, pipe } from '@morphism/fp';
import {
  parseISO,
  format as formatDateTime,
  add as _add,
  Duration as _Duration,
  sub,
} from 'date-fns';

export namespace Time {
  export type DateTime = { readonly dateTime: number };

  export namespace DateTime {
    export const fromISO = (iso: string): Either<Error, DateTime> =>
      pipe(
        Option.tryCatch(() => ({ dateTime: parseISO(iso).valueOf() })),
        Option.chain(Option.fromPredicate(({ dateTime }) => !isNaN(dateTime))),
        Either.fromOption(() => Error(`Failed to parse ISO date \`${iso}\``)),
      );

    export const now = (): DateTime => ({ dateTime: Date.now() });

    export const format = formatDateTime;

    type ToFormat = (dateTime: DateTime) => string;

    export const toYYYMMDD: ToFormat = ({ dateTime }) =>
      Time.DateTime.format(dateTime, 'yyyy-MM-dd');
  }

  export type Duration = _Duration;

  export namespace Duration {
    export const add =
      ({ dateTime }: DateTime) =>
      (duration: Duration): DateTime =>
        pipe(_add(dateTime, duration), (date) => ({
          dateTime: date.valueOf(),
        }));

    export const subtract =
      ({ dateTime }: DateTime) =>
      (duration: Duration): DateTime =>
        pipe(sub(dateTime, duration), (date) => ({
          dateTime: date.valueOf(),
        }));
  }
}
