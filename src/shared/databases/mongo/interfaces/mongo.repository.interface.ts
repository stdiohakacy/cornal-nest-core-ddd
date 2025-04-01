import {
  Model,
  PipelineStage,
  PopulateOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  ClientSession,
} from 'mongoose';
import {
  IMongoAggregateOptions,
  IMongoCreateManyOptions,
  IMongoCreateOptions,
  IMongoDeleteManyOptions,
  IMongoDeleteOptions,
  IMongoDocument,
  IMongoFindAllAggregateOptions,
  IMongoGetTotalOptions,
  IMongoSaveOptions,
  IMongoUpdateOptions,
  MongoFindAllOptionsInterface,
  MongoFindOneOptionsInterface,
  MongoOptionsInterface,
  MongoUpdateManyOptionsInterface,
} from '../interfaces/mongo.interface';
import { UpdateResult, DeleteResult, InsertManyResult } from 'mongodb';
import { MongoSoftDeleteDto } from '../dtos/mongo.soft-delete.dto';
import { MongoOrmEntity } from '../bases/mongo.entity';

export interface MongoRepositoryInterface<
  Entity extends MongoOrmEntity,
  EntityDocument extends IMongoDocument<Entity>,
> {
  // Basic Find
  findAll<T = EntityDocument>(
    find?: Record<string, any>,
    options?: MongoFindAllOptionsInterface,
  ): Promise<T[]>;

  findOne<T = EntityDocument>(
    find: Record<string, any>,
    options?: MongoFindOneOptionsInterface,
  ): Promise<T | null>;

  findOneById<T = EntityDocument>(
    _id: string,
    options?: MongoFindOneOptionsInterface,
  ): Promise<T | null>;

  findOneAndLock<T = EntityDocument>(
    find: Record<string, any>,
    options?: MongoFindOneOptionsInterface,
  ): Promise<T | null>;

  findOneByIdAndLock<T = EntityDocument>(
    _id: string,
    options?: MongoFindOneOptionsInterface,
  ): Promise<T | null>;

  exists(
    find: Record<string, any>,
    options?: MongoOptionsInterface,
  ): Promise<boolean>;

  getTotal(
    find?: Record<string, any>,
    options?: IMongoGetTotalOptions,
  ): Promise<number>;

  // Create
  create<T extends Entity>(
    data: T,
    options?: IMongoCreateOptions,
  ): Promise<EntityDocument>;

  createMany<T = Entity>(
    data: T[],
    options?: IMongoCreateManyOptions,
  ): Promise<InsertManyResult<Entity>>;

  // Update
  update(
    find: Record<string, any>,
    data: UpdateQuery<Entity> | UpdateWithAggregationPipeline,
    options?: IMongoUpdateOptions,
  ): Promise<EntityDocument | null>;

  updateMany<T = Entity>(
    find: Record<string, any>,
    data: T,
    options?: MongoUpdateManyOptionsInterface,
  ): Promise<UpdateResult<Entity>>;

  updateManyRaw(
    find: Record<string, any>,
    data: UpdateQuery<Entity> | UpdateWithAggregationPipeline,
    options?: MongoUpdateManyOptionsInterface,
  ): Promise<UpdateResult<Entity>>;

  // Delete
  delete(
    find: Record<string, any>,
    options?: IMongoDeleteOptions,
  ): Promise<EntityDocument | null>;

  deleteMany(
    find: Record<string, any>,
    options?: IMongoDeleteManyOptions,
  ): Promise<DeleteResult>;

  // Save
  save(
    repository: EntityDocument,
    options?: IMongoSaveOptions,
  ): Promise<EntityDocument>;

  // Populate
  join<T = any>(
    repository: EntityDocument,
    joins: PopulateOptions | (string | PopulateOptions)[],
  ): Promise<T>;

  // Soft Delete
  softDelete(
    repository: EntityDocument,
    dto?: MongoSoftDeleteDto,
    options?: MongoOptionsInterface,
  ): Promise<EntityDocument>;

  softDeleteMany(
    find: Record<string, any>,
    dto?: MongoSoftDeleteDto,
    options?: MongoOptionsInterface,
  ): Promise<UpdateResult<Entity>>;

  restore(
    repository: EntityDocument,
    options?: IMongoSaveOptions,
  ): Promise<EntityDocument>;

  restoreMany(
    find: Record<string, any>,
    options?: MongoOptionsInterface,
  ): Promise<UpdateResult<Entity>>;

  // Aggregate
  aggregate<AggregatePipeline extends PipelineStage, AggregateResponse = any>(
    pipelines: AggregatePipeline[],
    options?: IMongoAggregateOptions,
  ): Promise<AggregateResponse[]>;

  findAllAggregate<
    AggregatePipeline extends PipelineStage,
    AggregateResponse = any,
  >(
    pipelines: AggregatePipeline[],
    options?: IMongoFindAllAggregateOptions,
  ): Promise<AggregateResponse[]>;

  getTotalAggregate<AggregatePipeline extends PipelineStage>(
    pipelines: AggregatePipeline[],
    options?: IMongoAggregateOptions,
  ): Promise<number>;

  // Raw model access
  model(): Promise<Model<Entity>>;
}
