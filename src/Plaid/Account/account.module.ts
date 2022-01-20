import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DynamoDBModule } from '../../dynamodb/dynamodb.module';

@Module({
  imports: [DynamoDBModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
