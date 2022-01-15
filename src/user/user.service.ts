import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateUserPayload } from './user.types';
import { DynamoDBService } from '../dynamodb/dynamodb.service';

@Injectable()
export class UserService {
  constructor(private dynamodDbService: DynamoDBService) {}
  async createUser(payload: CreateUserPayload): Promise<any> {
    // build user object for DB
    const user = {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // throw early if the user is missing required fields
    if (!user.userId) {
      throw new BadRequestException('a user id is required to create a user');
    }

    // create a user and return it
    try {
      await this.dynamodDbService.documentClient
        .put({
          TableName: 'rentappusers',
          Item: user,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    // TODO: return the new user created by dynamoDB instead of the payload we sent to dynamoDB
    return user;
  }

  async getUserById(userId: string): Promise<AnyObject> {
    try {
      const { Item: user } = await this.dynamodDbService.documentClient
        .get({
          TableName: 'rentappusers',
          Key: { userId },
        })
        .promise();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
