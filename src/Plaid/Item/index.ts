import { Either, Option, pipe, Task, TaskEither } from '@morphism/fp';
import * as IO from 'io-ts';
import { Plaid, Account } from '..';

export type Item = Plaid.Item;
export namespace Item {
  export namespace Data {}
  export namespace Requests {
    export namespace Get {
      export type Options = Plaid.ItemGetRequest;

      export const request = (plaid: Plaid) => (requestArgs: Options) =>
        pipe(Plaid.tryCatch(plaid.client.itemGet(requestArgs)));
    }

    export namespace PublicTokenExchange {
      export type Options = Pick<
        Plaid.ItemPublicTokenExchangeRequest,
        'public_token'
      >;
      export namespace Options {
        export const runtime = IO.strict({
          public_token: IO.string,
        });
      }
      export const request = (plaid: Plaid) => (requestArgs: Options) =>
        Plaid.tryCatch(plaid.client.itemPublicTokenExchange(requestArgs));
    }
  }
}

export type Items = Item[];
export namespace Items {
  //need to add queries here;
}
