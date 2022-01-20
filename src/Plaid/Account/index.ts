import { pipe, Option, TaskEither, Either, Task } from '@morphism/fp';

import { Plaid } from '..';
import { Time } from '../../Time';

export type Account = Plaid.AccountBase;
export namespace Account {}

export type Accounts = Account[];
export namespace Accounts {
  export namespace Remote {
    export namespace Request {
      export namespace Get {
        export type Respone = Plaid.AccountsGetResponse;

        export type Options = Plaid.AccountsGetRequest;

        export const request =
          (plaid: Plaid) =>
          (requestArgs: Options): Plaid.Request<Plaid.AccountsGetResponse> =>
            Plaid.tryCatch(plaid.client.accountsGet(requestArgs));
      }
    }
  }
}
