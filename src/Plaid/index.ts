import { pipe, TaskEither } from '@morphism/fp';
import { Config, PlaidEnvironments, BuildConfigParams } from 'plaid';
import { AxiosPromise, AxiosResponse } from 'plaid/node_modules/axios';

import { Plaid, Plaid as Plaid_ } from './Plaid';
// import * as Link from './Link';
// import * as Account from './Account';
// import * as Item from './Item';
// export { Link, Account, Item };

declare module '.' {
  export type Plaid = { readonly client: Plaid_.PlaidApi };
  export namespace Plaid {
    export type Config = Plaid_.Configuration;
    export type BuildConfigParams = {
      clientId: string;
      secret: string;
    };
    export type Api = Plaid_.PlaidApi;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type Response<A> = AxiosResponse<A>;
    export type Request<T> = TaskEither<Error, Response<T>>;
    export function fromConfig(config: {
      clientId: string;
      secret: string;
    }): Plaid;
    export function tryCatch<A>(request: AxiosPromise<A>): Request<A>;
  }
}
Plaid.fromConfig = (config) => pipe(buildConfig(config), fromConfig);
Plaid.tryCatch = (request) =>
  TaskEither.tryCatch(
    () => request,
    (err) => err as Error,
  );

export const fromConfig = (config: Config) => ({
  client: new Plaid_.PlaidApi(config),
});

export const buildConfig = (config: BuildConfigParams): Config =>
  new Plaid.Configuration({
    basePath: PlaidEnvironments.development,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': config.clientId,
        'PLAID-SECRET': config.secret,
      },
    },
  });
export { Plaid_ as Plaid };
