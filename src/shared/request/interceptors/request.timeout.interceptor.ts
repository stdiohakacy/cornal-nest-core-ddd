import {
  REQUEST_CUSTOM_TIMEOUT_META_KEY,
  REQUEST_CUSTOM_TIMEOUT_VALUE_META_KEY,
} from './../constants/request.constant';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import ms from 'ms';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../enums/request.status-code';

@Injectable()
export class RequestTimeoutInterceptor
  implements NestInterceptor<Promise<any>>
{
  private readonly maxTimeoutInSecond: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    this.maxTimeoutInSecond =
      this.configService.get<number>('middleware.timeout');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    if (context.getType() === 'http') {
      const customTimeout = this.reflector.get<boolean>(
        REQUEST_CUSTOM_TIMEOUT_META_KEY,
        context.getHandler(),
      );

      if (customTimeout) {
        const seconds: string = this.reflector.get<string>(
          REQUEST_CUSTOM_TIMEOUT_VALUE_META_KEY,
          context.getHandler(),
        );

        return next.handle().pipe(
          timeout(ms(seconds as ms.StringValue)),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              throw new RequestTimeoutException({
                statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.TIMEOUT,
                message: 'http.clientError.requestTimeOut',
              });
            }
            return throwError(() => err);
          }),
        );
      } else {
        return next.handle().pipe(
          timeout(this.maxTimeoutInSecond),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              throw new RequestTimeoutException({
                statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.TIMEOUT,
                message: 'http.clientError.requestTimeOut',
              });
            }
            return throwError(() => err);
          }),
        );
      }
    }
  }
}
