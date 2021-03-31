import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import customConfig from './config/index';
import { JsonBodyMiddleware } from './common/middleware/json-body.middleware';
import { ApiLoggerMiddleware } from './common/middleware/api-logger.middleware';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { HelmetMiddleware } from './common/middleware/helmet.middleware';
import { CookieParserMiddleware } from './common/middleware/cookie-parser.middleware';
import { CompressionMiddleware } from './common/middleware/compression.middleware';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [customConfig],
    }),
    CommonModule,
    UserModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    const comomMiddlewares = [
      RateLimitMiddleware,
      ApiLoggerMiddleware,
      CorsMiddleware,
      HelmetMiddleware,
      CookieParserMiddleware,
      CompressionMiddleware,
      JsonBodyMiddleware,
    ];

    consumer.apply(...comomMiddlewares).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
