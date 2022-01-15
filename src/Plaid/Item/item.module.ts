import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { DynamoDBModule } from '../../dynamodb/dynamodb.module';

@Module({
  imports: [DynamoDBModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
