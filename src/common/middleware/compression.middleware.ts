import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private compression: any;

  constructor() {
    this.compression = compression();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.compression(req, res, next);
  }
}
