import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { LoggerService } from '../providers/logger.service';

@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    res.on('finish', () => {
      this.logger.log(
        `timestamp: ${date}, method: ${req.method}, protocol: ${
          req.protocol
        }, path: ${req.path}, duration: ${
          new Date().getTime() - date.getTime()
        }, status: ${res.statusCode}
        `,
      );
    });
    next();
  }
}
