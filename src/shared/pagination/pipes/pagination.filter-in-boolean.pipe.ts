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

export function PaginationFilterInBooleanPipe(
  field: string,
  defaultValue: boolean[],
  options?: PaginationFilterOptionsInterface,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterInBooleanPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
      private readonly helperArrayService: HelperArrayService,
    ) {}

    async transform(
      value: string,
    ): Promise<Record<string, boolean[] | string> | undefined> {
      if (options?.raw) {
        this.addToRequestInstance(value);
        return {
          [field]: value,
        };
      }

      const finalValue: boolean[] = value
        ? this.helperArrayService.unique(
            value.split(',').map((val: string) => val === 'true'),
          )
        : defaultValue;

      this.addToRequestInstance(finalValue);

      return {
        [field]: finalValue,
      };
    }

    private addToRequestInstance(value: boolean[] | string): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        filters: {
          ...(this.request.__pagination?.filters ?? {}),
          [field]: value,
        },
      };
    }
  }

  return mixin(MixinPaginationFilterInBooleanPipe);
}
