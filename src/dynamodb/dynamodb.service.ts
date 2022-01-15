import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

import { ApiConfigService } from '../config/apiConfig.service';

@Injectable()
export class DynamoDBService {
  constructor(private apiConfigService: ApiConfigService) {}

  documentClient = new DynamoDB.DocumentClient({
    region: this.apiConfigService.dynamoDbRegion,
    endpoint: this.apiConfigService.dynamoDbHost,
  });
}
