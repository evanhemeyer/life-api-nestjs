import { Injectable } from '@nestjs/common';
import { DynamoDB as DDB } from 'aws-sdk';

import { ApiConfigService } from '../config/apiConfig.service';
import { OmitBaseConfig, DynamoDB } from '.';

@Injectable()
export class DynamoDBService {
  documentClient: DynamoDB.DocumentClient;
  constructor(private apiConfigService: ApiConfigService) {
    this.documentClient = DynamoDB.DocumentClient.fromConfig({
      endpoint: this.apiConfigService.dynamoDbHost,
      region: this.apiConfigService.dynamoDbRegion,
    });
  }

  private baseConfig = {
    TableName: 'rentappusers',
  };

  put(args: OmitBaseConfig<DDB.Put>) {
    return DynamoDB.DocumentClient.toSafeRequest(
      this.documentClient.put({ ...this.baseConfig, ...args }).promise(),
    );
  }

  get(args: OmitBaseConfig<DDB.Get>) {
    return DynamoDB.DocumentClient.toSafeRequest(
      this.documentClient.get({ ...this.baseConfig, ...args }).promise(),
    );
  }

  update(args: OmitBaseConfig<DDB.Update>) {
    return DynamoDB.DocumentClient.toSafeRequest(
      this.documentClient.update({ ...this.baseConfig, ...args }).promise(),
    );
  }

  query(args: OmitBaseConfig<DDB.QueryInput>) {
    return DynamoDB.DocumentClient.toSafeRequest(
      this.documentClient.query({ ...this.baseConfig, ...args }).promise(),
    );
  }

  batchWrite(args: OmitBaseConfig<DDB.BatchWriteItemInput>) {
    return DynamoDB.DocumentClient.toSafeRequest(
      this.documentClient.batchWrite({ ...this.baseConfig, ...args }).promise(),
    );
  }
}
