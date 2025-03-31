import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { HelloModule } from 'src/modules/hello/hello.module';

@Module({
  imports: [SharedModule, HelloModule],
  controllers: [],
})
export class AppModule {}
