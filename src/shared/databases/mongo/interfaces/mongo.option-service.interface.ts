import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface MongoOptionsServiceInterface {
  createOptions(): MongooseModuleOptions;
}
