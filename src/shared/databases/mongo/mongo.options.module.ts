import { Module } from '@nestjs/common';
import { MongoOptionService } from './services/mongo.options.service';

@Module({
  providers: [MongoOptionService],
  exports: [MongoOptionService],
  imports: [],
  controllers: [],
})
export class MongoOptionModule {}
