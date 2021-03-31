import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../common/providers/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  async getUserData(data) {
    this.logger.log(data);
    return data;
  }
}
