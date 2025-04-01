import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import {
  PAGINATION_DEFAULT_AVAILABLE_ORDER_BY,
  PAGINATION_DEFAULT_AVAILABLE_ORDER_DIRECTION,
  PAGINATION_DEFAULT_ORDER_BY,
  PAGINATION_DEFAULT_ORDER_DIRECTION,
} from '../constants/pagination.constant';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../enums/pagination.enum';
import { RequestApplicationInterface } from 'src/shared/request/interfaces/request.interface';
import { PaginationServiceInterface } from '../interfaces/pagination.service.interface';

export function PaginationOrderPipe(
  defaultOrderBy: string = PAGINATION_DEFAULT_ORDER_BY,
  defaultOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE = PAGINATION_DEFAULT_ORDER_DIRECTION,
  availableOrderBy: string[] = PAGINATION_DEFAULT_AVAILABLE_ORDER_BY,
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationOrderPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
      private readonly paginationService: PaginationServiceInterface,
    ) {}

    async transform(value: Record<string, any>): Promise<Record<string, any>> {
      const orderBy: string = value?.orderBy ?? defaultOrderBy;
      const orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE =
        value?.orderDirection ?? defaultOrderDirection;
      const availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[] =
        PAGINATION_DEFAULT_AVAILABLE_ORDER_DIRECTION;

      const order: Record<string, any> = this.paginationService.order(
        orderBy,
        orderDirection,
        availableOrderBy,
      );

      this.addToRequestInstance(
        orderBy,
        orderDirection,
        availableOrderBy,
        availableOrderDirection,
      );
      return {
        ...value,
        _order: order,
        _availableOrderBy: availableOrderBy,
        _availableOrderDirection: availableOrderDirection,
      };
    }

    addToRequestInstance(
      orderBy: string,
      orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
      availableOrderBy: string[],
      availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[],
    ): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        orderBy,
        orderDirection,
        availableOrderBy,
        availableOrderDirection,
      };
    }
  }

  return mixin(MixinPaginationOrderPipe);
}
