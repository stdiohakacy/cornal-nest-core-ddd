import { PipeTransform, Injectable, Scope, Inject, Type } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HelperDateService } from 'src/shared/helper/services/helper.date.service';
import { mixin } from '@nestjs/common';
import { PaginationFilterDateBetweenOptionsInterface } from '../interfaces/pagination.interface';
import { RequestApplicationInterface } from 'src/shared/request/interfaces/request.interface';
import { ENUM_HELPER_DATE_DAY_OF } from 'src/shared/helper/enums/helper.enum';

export function PaginationFilterDateBetweenPipe(
  fieldStart: string,
  fieldEnd: string,
  options?: PaginationFilterDateBetweenOptionsInterface,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationFilterDatePipe implements PipeTransform {
    constructor(
      @Inject(REQUEST)
      protected readonly request: RequestApplicationInterface,
      private readonly helperDateService: HelperDateService,
    ) {}

    async transform(): Promise<Record<string, { start: Date; end: Date }>> {
      const finalFieldStart = options?.queryFieldStart ?? fieldStart;
      const finalFieldEnd = options?.queryFieldEnd ?? fieldEnd;
      const { body } = this.request;

      if (!body[finalFieldStart] || !body[finalFieldEnd]) {
        return {};
      }

      const finalStartValue: Date = this.helperDateService.createFromIso(
        body[finalFieldStart],
        { dayOf: ENUM_HELPER_DATE_DAY_OF.START },
      );
      const finalEndValue: Date = this.helperDateService.createFromIso(
        body[finalFieldEnd],
        { dayOf: ENUM_HELPER_DATE_DAY_OF.END },
      );

      this.addToRequestInstance(finalStartValue, finalEndValue);

      return {
        [fieldStart]: {
          start: finalStartValue,
          end: finalEndValue,
        },
      };
    }

    private addToRequestInstance(startValue: Date, endValue: Date): void {
      const finalFieldStart = options?.queryFieldStart ?? fieldStart;
      const finalFieldEnd = options?.queryFieldEnd ?? fieldEnd;

      this.request.__pagination = {
        ...this.request.__pagination,
        filters: this.request.__pagination?.filters
          ? {
              ...this.request.__pagination?.filters,
              [finalFieldStart]: startValue,
              [finalFieldEnd]: endValue,
            }
          : {
              [finalFieldStart]: startValue,
              [finalFieldEnd]: endValue,
            },
      };
    }
  }

  return mixin(MixinPaginationFilterDatePipe);
}
