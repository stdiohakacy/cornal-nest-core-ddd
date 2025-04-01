import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { RequestApplicationInterface } from 'src/shared/request/interfaces/request.interface';
import { PaginationService } from '../services/pagination.service';

export function PaginationSearchPipe(
  availableSearch: string[] = [],
): Type<PipeTransform> {
  @Injectable({ scope: Scope.REQUEST })
  class MixinPaginationSearchPipe implements PipeTransform {
    constructor(
      @Inject(REQUEST) protected readonly request: RequestApplicationInterface,
      private readonly paginationService: PaginationService,
    ) {}

    async transform(value: Record<string, any>): Promise<Record<string, any>> {
      if (availableSearch.length === 0 || !value?.search) {
        this.addToRequestInstance(value?.search, availableSearch);
        return value;
      }

      const search: Record<string, any> = this.paginationService.search(
        value?.search,
        availableSearch,
      );

      this.addToRequestInstance(value?.search, availableSearch);
      return {
        ...value,
        _search: search,
        _availableSearch: availableSearch,
      };
    }

    addToRequestInstance(search: string, availableSearch: string[]): void {
      this.request.__pagination = {
        ...this.request.__pagination,
        search,
        availableSearch,
      };
    }
  }

  return mixin(MixinPaginationSearchPipe);
}
