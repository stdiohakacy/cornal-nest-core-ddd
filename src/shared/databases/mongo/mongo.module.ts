import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongoService } from './services/mongo.service';

@Global()
@Module({})
export class MongoModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoModule,
      providers: [MongoService],
      exports: [MongoService],
      imports: [],
      controllers: [],
    };
  }
}
