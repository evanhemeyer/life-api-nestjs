import { Module } from '@nestjs/common';
import { ItemController } from './Item.controller';
import { ItemService } from './Item.service';
import { DynamoDBModule } from '../../dynamodb/dynamodb.module';
import { ApiConfigModule } from 'src/config/apiConfig.module';

@Module({
  imports: [DynamoDBModule, ApiConfigModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule { }
