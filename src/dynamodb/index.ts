import { TaskEither } from '@morphism/fp';
import { DynamoDB as DDB } from 'aws-sdk';

export type OmitBaseConfig<T> = Omit<T, 'TableName'>;
export type DynamoDB = DDB;
export namespace DynamoDB {
  export type DocumentClient = DDB.DocumentClient;

  export namespace DocumentClient {
    export type Item = {
      PK: string;
      SK: string;
      value: string;
    };

    type Config = {
      endpoint: string;
      region: string;
    };
    export const fromConfig = (config: Config): DocumentClient =>
      new DDB.DocumentClient({
        endpoint: config.endpoint,
        region: config.region,
      });

    export const toSafeRequest = <T>(
      documentRequest: Promise<T>,
    ): TaskEither<Error, T> =>
      TaskEither.tryCatch(
        () => documentRequest,
        (err) => err as Error,
      );

    const baseRequestConfig = {
      TableName: 'rentappusers',
    };

    export const put =
      (documentClient: DocumentClient) =>
      (args: OmitBaseConfig<DDB.PutItemInput>) => {
        return DynamoDB.DocumentClient.toSafeRequest(
          documentClient.put({ ...baseRequestConfig, ...args }).promise(),
        );
      };

    export const get =
      (args: OmitBaseConfig<DDB.Get>) => (documentClient: DocumentClient) => {
        return DynamoDB.DocumentClient.toSafeRequest(
          documentClient.get({ ...baseRequestConfig, ...args }).promise(),
        );
      };

    export const update =
      (args: OmitBaseConfig<DDB.Update>) =>
      (documentClient: DocumentClient) => {
        return DynamoDB.DocumentClient.toSafeRequest(
          documentClient.update({ ...baseRequestConfig, ...args }).promise(),
        );
      };

    export const query =
      (args: OmitBaseConfig<DDB.QueryInput>) =>
      (documentClient: DocumentClient) => {
        return DynamoDB.DocumentClient.toSafeRequest(
          documentClient.query({ ...baseRequestConfig, ...args }).promise(),
        );
      };

    export const batchWrite =
      (args: OmitBaseConfig<DDB.BatchWriteItemInput>) =>
      (documentClient: DocumentClient) => {
        return DynamoDB.DocumentClient.toSafeRequest(
          documentClient
            .batchWrite({ ...baseRequestConfig, ...args })
            .promise(),
        );
      };
  }
}
