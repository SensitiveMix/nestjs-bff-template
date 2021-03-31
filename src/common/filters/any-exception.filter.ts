import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorCode } from '../../constants/error';
import { LoggerService } from '../providers/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      return response.status(status).json(exception.getResponse());
    }

    this.logger.error(`${request.method} ${request.url} error: ${exception}`);

    response.status(status).json(ErrorCode.INTERVAL_ERROR);
  }
}
