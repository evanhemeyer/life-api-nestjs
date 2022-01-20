import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getUser(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'We did it fam' });
  }

  @Get(':id')
  async getUserById(@Res() res: Response, @Param() { id }: { id: string }) {}

  @Post()
  async create(@Res() res: Response, @Body() body: CreateUserPayload) {}

  @Get(':id/salesperson')
  getUserSalesperson(@Res() res: Response) {}
}
