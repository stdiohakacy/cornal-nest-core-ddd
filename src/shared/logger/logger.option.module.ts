import { Module } from '@nestjs/common';
import { LoggerOptionService } from './services/logger.option.service';

@Module({
  providers: [LoggerOptionService],
  exports: [LoggerOptionService],
})
export class LoggerOptionModule {}
