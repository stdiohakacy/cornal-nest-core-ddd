import {
  PipeTransform,
  Injectable,
  Scope,
  Inject,
  Type,
  mixin,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginationFilterOptionsInterface } from '../interfaces/pagination.interface';
import { RequestApplicationInterface } from 'src/shared/request/interfaces/request.interface';

export function PaginationFilterStringContainPipe(
  field: string,
  options?: PaginationFilterOptionsInterface,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterContainPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
    ) {}

    async transform(
      value: string,
    ): Promise<Record<string, string> | undefined> {
      if (!value) return;

      if (options?.raw) {
        this.addToRequestInstance(value);
        return {
          [field]: value,
        };
      }

      const finalValue = value.trim();

      this.addToRequestInstance(finalValue);

      return {
        [`${field}_like`]: finalValue,
      };
    }

    private addToRequestInstance(value: string): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: {
          ...(this.request.__pagination?.filters ?? {}),
          [`${field}_like`]: value,
        },
      };
    }
  }

  return mixin(MixinPaginationFilterContainPipe);
}
