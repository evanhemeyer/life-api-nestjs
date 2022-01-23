import { pipe } from '@morphism/fp';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { DynamoDBService } from '../../dynamodb/dynamodb.service';
import { Item } from '.';

@Injectable()
export class ItemService {
  constructor(private dynamodDbService: DynamoDBService) {}

  async updateById() {}

  async getById() {}

  async getByUserId() {}

  create(item: Item) {
    return pipe(
      Item.Data.toDDBModel(item, 'Item'),
      this.dynamodDbService.put({ Item: item }),
    );
  }
}
