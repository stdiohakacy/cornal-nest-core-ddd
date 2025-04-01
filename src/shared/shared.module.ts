import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerOptionModule } from './logger/logger.option.module';
import { LoggerOptionService } from './logger/services/logger.option.service';
import { HelperModule } from './helper/helper.module';
import { PaginationModule } from './pagination/pagination.module';
import { MongoModule } from './databases/mongo/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION_NAME } from './databases/mongo/constants/mongo.constant';
import { MongoOptionModule } from './databases/mongo/mongo.options.module';
import { MongoOptionService } from './databases/mongo/services/mongo.options.service';

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
    MongooseModule.forRootAsync({
      connectionName: MONGO_CONNECTION_NAME,
      imports: [MongoOptionModule],
      inject: [MongoOptionService],
      useFactory: async (mongoOptionService: MongoOptionService) =>
        mongoOptionService.createOptions(),
    }),
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
