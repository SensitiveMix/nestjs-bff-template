import { Injectable, NestMiddleware } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimit: any;

  constructor(private readonly configService: ConfigService) {
    this.rateLimit = rateLimit({
      windowMs: this.configService.get('server.rateLimit.windowMs'),
      max: this.configService.get('server.rateLimit.maxRequest'),
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.rateLimit(req, res, next);
  }
}
