import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

import { ApiConfigService } from '../config/apiConfig.service';

@Injectable()
export class DynamoDBService {
  documentClient: DynamoDB.DocumentClient;
  constructor(private apiConfigService: ApiConfigService) {
    this.documentClient = new DynamoDB.DocumentClient({
      region: this.apiConfigService.dynamoDbRegion,
      endpoint: this.apiConfigService.dynamoDbHost,
    });
  }

  get(input: Omit<DynamoDB.DocumentClient.GetItemInput, 'TableName'>) {
    return this.documentClient.get({ ...input, TableName: 'lifeApp' });
  }
}
