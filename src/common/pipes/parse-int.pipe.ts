import { PipeTransform, Injectable } from '@nestjs/common';
import { BadRequestException } from '../exception/bad-request.exception';

/** Convert a string like "1" to a number, but without NaN */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      throw new BadRequestException('INVALID_NUMBER');
    }
    return num;
  }
}
