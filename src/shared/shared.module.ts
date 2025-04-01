import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerOptionModule } from './logger/logger.option.module';
import { LoggerOptionService } from './logger/services/logger.option.service';
import { HelperModule } from './helper/helper.module';
import { PaginationModule } from './pagination/pagination.module';
import { MongoModule } from './databases/mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    PaginationModule,
    MongoModule.forRoot(),
    HelperModule.forRoot(),
    PinoLoggerModule.forRootAsync({
      imports: [LoggerOptionModule],
      inject: [LoggerOptionService],
      useFactory: async (loggerOptionService: LoggerOptionService) =>
        loggerOptionService.createOptions(),
    }),
  ],
})
export class SharedModule {}
