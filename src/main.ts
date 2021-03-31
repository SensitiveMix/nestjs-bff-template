import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerService } from './common/providers/logger.service';

async function bootstrap(): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isProduction ? false : undefined,
  });

  app.disable('x-powered-by');
  app.useLogger(await app.resolve(LoggerService));

  const appConfig = app.get('ConfigService');
  await app.listen(appConfig.get('server.port'));
}
bootstrap().catch(console.error);
