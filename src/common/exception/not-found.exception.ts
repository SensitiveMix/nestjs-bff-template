import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../../constants/error';

export class NotFoundException extends HttpException {
  constructor(errorKey: string, traceId: string) {
    if (!ErrorCode[errorKey]) throw new Error('Invalid error key');
    super(
      traceId
        ? Object.assign({ traceId }, ErrorCode[errorKey])
        : ErrorCode[errorKey],
      HttpStatus.NOT_FOUND,
    );
  }
}
