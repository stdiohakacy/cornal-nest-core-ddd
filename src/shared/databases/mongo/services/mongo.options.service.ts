import { Injectable } from '@nestjs/common';
import { MongoOptionsServiceInterface } from '../interfaces/mongo.option-service.interface';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ENUM_APP_ENVIRONMENT } from 'src/app/enums/app.enum';
import mongoose from 'mongoose';

@Injectable()
export class MongoOptionService implements MongoOptionsServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): MongooseModuleOptions {
    const env = this.configService.get<string>('app.env');

    const url = this.configService.get<string>('database.url');
    const debug = this.configService.get<boolean>('database.debug');

    const timeoutOptions = this.configService.get<Record<string, number>>(
      'database.timeoutOptions',
    );

    if (env !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
      mongoose.set('debug', debug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri: url,
      autoCreate: env === ENUM_APP_ENVIRONMENT.MIGRATION,
      autoIndex: env === ENUM_APP_ENVIRONMENT.MIGRATION,
      ...timeoutOptions,
    };

    return mongooseOptions;
  }
}
