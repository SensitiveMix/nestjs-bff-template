import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (
      this.configService
        .get('server.allowOrigins')
        .indexOf(req.headers.origin) >= 0
    ) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS,HEAD,PUT,POST,GET,DELETE',
    );
    next();
  }
}
