import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DynamoDBService } from '../../dynamodb/dynamodb.service';

@Injectable()
export class AccountService {
  constructor(private dynamodDbService: DynamoDBService) {}

  async updateById() {}

  async getById() {}

  async getByUserId() {}

  async create() {}
}
