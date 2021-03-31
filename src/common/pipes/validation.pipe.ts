import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import Ajv from 'ajv';
import { BadRequestException } from '../exception/bad-request.exception';
import { LoggerService } from '../providers/logger.service';

@Injectable()
export class AjvValidationPipe implements PipeTransform {
  private readonly ajv = new Ajv();
  private readonly logger: LoggerService;
  constructor(private schema: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema) throw new Error('invalid schema');

    const validator = this.ajv.compile(this.schema);

    const isValid = validator(value);

    if (!isValid) {
      this.logger.error(
        `metadata: ${metadata}, value: ${value}, message: Validation failed`,
      );
      throw new BadRequestException('INVALID_PARM');
    }
    return value;
  }
}
