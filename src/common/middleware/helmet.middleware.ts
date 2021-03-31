import { Injectable, NestMiddleware } from '@nestjs/common';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private helmet: any;

  constructor(private readonly configService: ConfigService) {
    helmet.hsts(configService.get('server.helmet.hsts'));

    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: configService.get(
          'server.helmet.contentSecurityPolicy.defaultSrc',
        ),
        frameAncestors: configService.get(
          'server.helmet.contentSecurityPolicy.frameAncestors',
        ),
        scriptSrc: configService.get(
          'server.helmet.contentSecurityPolicy.scriptSrc',
        ),
        styleSrc: configService.get(
          'server.helmet.contentSecurityPolicy.styleSrc',
        ),
        imgSrc: configService.get('server.helmet.contentSecurityPolicy.imgSrc'),
        connectSrc: configService.get(
          'server.helmet.contentSecurityPolicy.connectSrc',
        ),
      },
    });

    helmet.referrerPolicy(configService.get('server.helmet.referrerPolicy'));

    this.helmet = helmet();
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.helmet(req, res, next);
  }
}
