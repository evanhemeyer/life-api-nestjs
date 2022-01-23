import { Either, Option, pipe, Task, TaskEither } from '@morphism/fp';
import * as IO from 'io-ts';
import { DynamoDB as DDB } from 'aws-sdk';
import { InternalServerErrorException } from '@nestjs/common';

import { DynamoDB } from 'src/dynamodb';
import { Plaid } from '..';

export type Item = Plaid.Item;
export namespace Item {
  export namespace Data {
    export const toDDBModel = (
      item: Plaid.ItemPublicTokenExchangeResponse,
      itemPropert: string,
    ): DynamoDB.DocumentClient.Item => ({
      PK: `Item#${item.item_id}`,
      SK: `Property#${itemPropert}`,
      value: JSON.stringify(item),
    });

    export const createFromTokenExchange =
      (documentClient: DynamoDB.DocumentClient) =>
      (itemRespone: Plaid.Response<Plaid.ItemPublicTokenExchangeResponse>) =>
        pipe(
          toDDBModel(itemRespone.data, 'Item'),
          (item) =>
            DynamoDB.DocumentClient.put(documentClient)({
              Item: item as DDB.AttributeMap,
            }),
          TaskEither.map((result) => result.$response),
          TaskEither.mapLeft(
            (err) =>
              new InternalServerErrorException(
                'There was an issue with dynamodb while creating item',
              ),
          ),
        );
  }
  export namespace Remote {
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
        export const Runtime = IO.strict({
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
