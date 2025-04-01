import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../enums/pagination.enum';
import { PaginationOrderInterface } from './pagination.interface';

export interface PaginationServiceInterface {
  offset(page: number, perPage: number): number;
  totalPage(totalData: number, perPage: number): number;
  page(page?: number): number;
  perPage(perPage?: number): number;
  order(
    orderByValue: string,
    orderDirectionValue: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
    availableOrderBy: string[],
  ): PaginationOrderInterface;
  search(searchValue: string, availableSearch: string[]): Record<string, any>;
}
