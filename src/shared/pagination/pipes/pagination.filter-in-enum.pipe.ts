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
import { HelperArrayService } from 'src/shared/helper/services/helper.array.service';

export function PaginationFilterInEnumPipe<T>(
  field: string,
  defaultValue: T,
  defaultEnum: Record<string, any>,
  options?: PaginationFilterOptionsInterface,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterInEnumPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
      private readonly helperArrayService: HelperArrayService,
    ) {}

    async transform(value: string): Promise<Record<string, T[]> | undefined> {
      if (options?.raw) {
        this.addToRequestInstance(value as unknown as T[]);
        return {
          [field]: value as unknown as T[],
        };
      }

      const finalValue: T[] = value
        ? this.helperArrayService.getIntersection<T>(
            value.split(',') as T[],
            Object.values(defaultEnum) as T[],
          )
        : (defaultValue as T[]);

      this.addToRequestInstance(finalValue);

      return {
        [field]: finalValue,
      };
    }

    private addToRequestInstance(value: T[]): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: {
          ...(this.request.__pagination?.filters ?? {}),
          [field]: value,
        },
      };
    }
  }

  return mixin(MixinPaginationFilterInEnumPipe);
}
