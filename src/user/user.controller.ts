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
import { UserService } from './user.service';
import { CreateUserPayload } from './user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'We did it fam' });
  }

  @Get(':id')
  async getUserById(@Res() res: Response, @Param() { id }: { id: string }) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return res.status(200).json(user);
  }

  @Post()
  async create(@Res() res: Response, @Body() body: CreateUserPayload) {
    // do stuff
    console.log({ body });
    const existingUser = await this.userService.getUserById(body.userId);
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const user = await this.userService.createUser(body);
    return res.status(201).json(user);
  }

  @Get(':id/salesperson')
  getUserSalesperson(@Res() res: Response) {
    res.send('Salesperson');
  }
}
