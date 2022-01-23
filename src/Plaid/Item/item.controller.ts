import { Either, pipe, Task, TaskEither } from '@morphism/fp';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ItemService } from './Item.service';
import { Item } from '.';
import { Plaid } from '../Plaid';
import { ApiConfigService } from 'src/config/apiConfig.service';
import { DynamoDBService } from 'src/dynamodb/dynamodb.service';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly configService: ApiConfigService,
    private readonly dynamoDbService: DynamoDBService,
  ) {}

  @Post('public-token-exchange')
  async exchangePublicToken(@Res() res: Response, @Body() body) {
    return pipe(
      Item.Remote.PublicTokenExchange.Options.Runtime.decode(body),
      Either.mapLeft((err) => Error(JSON.stringify(err, null, 2))),
      TaskEither.fromEither,
      TaskEither.chain(
        Item.Remote.PublicTokenExchange.request(
          Plaid.fromConfig({
            clientId: this.configService.plaidClientId,
            secret: this.configService.plaidSecret,
          }),
        ),
      ),
      TaskEither.chain(
        Item.Data.createFromTokenExchange(this.dynamoDbService.documentClient),
      ),
      // Task.map(
      //   Either.fold(
      //     (err) => res.status(err.getStatus()).send(err.message),
      //     (token) => res.send(token),
      //   ),
      // ),
    );
  }

  @Post(':itemId/sync-accounts')
  async syncItemAccounts(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: { itemId: string },
  ) {
    return pipe(
      Item.Remote.PublicTokenExchange.Options.Runtime.decode(body.itemId),
      //read item from accounts
      TaskEither.fromEither,
      TaskEither.chain(
        pipe(
          Item.Data.toDDBModel(item, 'Item'),
          this.dynamodDbService.put({ Item: item }),
        ),
      ),
    );
  }
}
