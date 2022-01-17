import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwtDecode from 'jwt-decode';

import { ESAccessToken } from './authentication.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).send(Error('Unauthorized'));
    //   next();
    // }
    // const decodedToken = jwtDecode<ESAccessToken>(token);

    //fetch user
    //set req.user = to fetched user

    next();
  }
}
