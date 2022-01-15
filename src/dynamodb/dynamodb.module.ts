import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config/apiConfig.module';

import { DynamoDBService } from './dynamodb.service';

@Module({
  imports: [ApiConfigModule],
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class DynamoDBModule {}
