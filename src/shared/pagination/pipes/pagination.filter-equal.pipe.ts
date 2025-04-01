import {
  PipeTransform,
  Injectable,
  Scope,
  Inject,
  Type,
  mixin,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginationFilterEqualOptionsInterface } from '../interfaces/pagination.interface';
import { RequestApplicationInterface } from 'src/shared/request/interfaces/request.interface';

export function PaginationFilterEqualPipe(
  field: string,
  options?: PaginationFilterEqualOptionsInterface,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterEqualPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
    ) {}

    async transform(
      value: string,
    ): Promise<Record<string, unknown> | undefined> {
      if (!value) {
        return;
      }

      let finalValue: string | number = value;

      if (!options?.raw) {
        finalValue = options?.isNumber ? Number.parseInt(value) : value.trim();
      }

      this.addToRequestInstance(finalValue);

      return {
        [field]: finalValue,
      };
    }

    private addToRequestInstance(value: unknown): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: {
          ...(this.request.__pagination?.filters ?? {}),
          [field]: value,
        },
      };
    }
  }

  return mixin(MixinPaginationFilterEqualPipe);
}
