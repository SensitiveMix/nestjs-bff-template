import { Global, Module } from '@nestjs/common';
import { LoggerService } from './providers/logger.service';
import { UtilService } from './providers//util.service';
import { RequestContext } from './providers/request-context.service';

@Global()
@Module({
  providers: [RequestContext, LoggerService, UtilService],
  exports: [RequestContext, LoggerService, UtilService],
})
export class CommonModule {}
