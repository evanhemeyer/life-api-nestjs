import { Plaid } from '..';
import { pipe, TaskEither } from '@morphism/fp';
import { Time } from '../../Time';

export type Transaction = Plaid.Transaction;

export namespace Transaction {}

export type Transactions = Transaction[];

export namespace Transactions {
  export namespace Request {
    export namespace Get {
      export type Options = {
        startDate: Time.DateTime;
        endDate: Time.DateTime;
        accessToken: string;
        accountIds?: string[];
        totalTransactions?: number;
      };

      export const request =
        (plaid: Plaid) =>
        ({
          startDate,
          endDate,
          ...rest
        }: Options): TaskEither<Error, Transactions> =>
          pipe(
            {
              startDate: Time.DateTime.format(startDate.dateTime, 'yyyy-MM-dd'),
              endDate: Time.DateTime.format(endDate.dateTime, 'yyyy-MM-dd'),
              ...rest,
            },
            ({ startDate, endDate, accountIds, accessToken }) =>
              TaskEither.tryCatch(
                async () => {
                  let transactionAcc: Transactions = [];
                  let totalTransaction = 0;

                  try {
                    while (transactionAcc.length <= totalTransaction) {
                      const transactionResponse =
                        await plaid.client.transactionsGet({
                          start_date: startDate,
                          end_date: endDate,
                          access_token: accessToken,
                          options: {
                            offset: transactionAcc.length,
                            account_ids: accountIds,
                          },
                        });
                      transactionAcc = transactionAcc.concat(
                        transactionResponse.data.transactions,
                      );
                      totalTransaction =
                        transactionResponse.data.total_transactions;
                      if (transactionAcc.length === totalTransaction) break;
                    }
                    return transactionAcc;
                  } catch (error) {
                    return Promise.reject(error);
                  }
                },
                (err) => err as Error,
              ),
          );
    }
  }
}
