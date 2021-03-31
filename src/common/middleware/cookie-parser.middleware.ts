import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  private cookieParser: any;

  constructor() {
    this.cookieParser = cookieParser();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.cookieParser(req, res, next);
  }
}
