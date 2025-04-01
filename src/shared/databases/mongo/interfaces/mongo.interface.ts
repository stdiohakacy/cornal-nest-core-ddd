import { ClientSession, PopulateOptions, Document } from 'mongoose';
import { PaginationOrderInterface } from 'src/shared/pagination/interfaces/pagination.interface';

export interface MongoQueryContainOptionsInterface {
  fullWord: boolean;
}

export type IMongoDocument<T> = T & Document;

export interface MongoOptionsInterface {
  select?: Record<string, boolean | number> | string;
  join?: boolean | PopulateOptions | PopulateOptions[];
  session?: ClientSession;
  withDeleted?: boolean;
}

export interface MongoFindOneOptionsInterface extends MongoOptionsInterface {
  order: PaginationOrderInterface;
}

export type IMongoGetTotalOptions = Omit<MongoOptionsInterface, 'select'>;

export interface MongoFindAllPagingOptionsInterface {
  limit: number;
  offset: number;
}

export interface MongoFindAllOptionsInterface
  extends MongoFindOneOptionsInterface {
  paging?: MongoFindAllPagingOptionsInterface;
}

// Action
export type IMongoCreateOptions = Pick<MongoOptionsInterface, 'session'>;
export type IMongoUpdateOptions = Omit<
  MongoOptionsInterface,
  'select' | 'join'
>;
export type IMongoDeleteOptions = Omit<
  MongoOptionsInterface,
  'select' | 'join'
>;
export type IMongoSaveOptions = Pick<MongoOptionsInterface, 'session'>;

// Bulk
export type IMongoCreateManyOptions = Pick<MongoOptionsInterface, 'session'>;

export interface MongoUpdateManyOptionsInterface
  extends Pick<MongoOptionsInterface, 'session' | 'withDeleted'> {
  upsert?: boolean;
}

export type IMongoDeleteManyOptions = Pick<
  MongoOptionsInterface,
  'session' | 'withDeleted'
>;

// Raw
export type IMongoAggregateOptions = Pick<
  MongoOptionsInterface,
  'session' | 'withDeleted'
>;
export type IMongoFindAllAggregateOptions = Omit<
  MongoFindAllOptionsInterface,
  'join' | 'select'
>;
