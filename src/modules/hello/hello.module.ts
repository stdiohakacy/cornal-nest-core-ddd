import { Module } from '@nestjs/common';
import { HelloPublicController } from './controllers/hello.controller';

@Module({
  controllers: [HelloPublicController],
})
export class HelloModule {}
