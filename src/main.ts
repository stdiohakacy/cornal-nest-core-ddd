import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import compression from 'compression';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: false,
  });

  const configService = app.get(ConfigService);
  const databaseUri: string = configService.get<string>('database.url');
  const env: string = configService.get<string>('app.env');
  const timezone: string = configService.get<string>('app.timezone');
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.urlVersion.prefix',
  );
  const version: string = configService.get<string>('app.urlVersion.version');
  const versionEnable: string = configService.get<string>(
    'app.urlVersion.enable',
  );
  const logger = new Logger('Cornal Nest Core DDD');
  process.env.NODE_ENV = env;
  process.env.TZ = timezone;

  app.useLogger(app.get(PinoLogger));
  app.use(compression());
  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }

  await app.listen(3000);
}
bootstrap();
