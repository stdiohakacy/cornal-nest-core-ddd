import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestTimeoutInterceptor } from './interceptors/request.timeout.interceptor';

@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: RequestTimeoutInterceptor,
        },
      ],
      imports: [],
      exports: [],
    };
  }
}
