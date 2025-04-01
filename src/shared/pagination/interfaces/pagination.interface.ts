import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../enums/pagination.enum';

export type PaginationOrderInterface = Record<
  string,
  ENUM_PAGINATION_ORDER_DIRECTION_TYPE
>;

export interface PaginationQueryOptionsInterface {
  defaultPerPage?: number;
  defaultOrderBy?: string;
  defaultOrderDirection?: ENUM_PAGINATION_ORDER_DIRECTION_TYPE;
  availableSearch?: string[];
  availableOrderBy?: string[];
}

export interface PaginationFilterOptionsInterface {
  queryField?: string;
  raw?: boolean;
}

export interface PaginationFilterDateBetweenOptionsInterface {
  queryFieldStart?: string;
  queryFieldEnd?: string;
}

export interface PaginationFilterEqualOptionsInterface
  extends PaginationFilterOptionsInterface {
  isNumber?: boolean;
}
