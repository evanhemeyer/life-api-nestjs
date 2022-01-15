import { Module } from '@nestjs/common';
import { ItemController } from './transaction.controller';
import { ItemService } from './transaction.service';
import { DynamoDBModule } from '../../dynamodb/dynamodb.module';

@Module({
  imports: [DynamoDBModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
