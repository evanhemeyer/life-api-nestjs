import * as IO from 'io-ts';
import * as Either from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

const Environment = IO.type({
  IS_OFFLINE: IO.string,
  DYNAMO_DB_REGION: IO.string,
  DYNAMO_DB_HOST: IO.string,
});

export type Environment = IO.TypeOf<typeof Environment>;

const ExactEnvironment = IO.exact(Environment);

export function readFromEnvironment(
  config: Record<string, any>,
): IO.TypeOf<typeof ExactEnvironment> | never {
  return pipe(
    ExactEnvironment.decode(config),
    Either.getOrElse(() => {
      throw Error('Env error');
    }),
  );
}
