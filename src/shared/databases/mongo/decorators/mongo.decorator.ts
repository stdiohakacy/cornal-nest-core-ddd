import { Type } from '@nestjs/common';
import {
  InjectConnection,
  InjectModel,
  Prop,
  PropOptions,
  Schema,
  SchemaFactory,
  SchemaOptions,
} from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { MONGO_CONNECTION_NAME } from '../constants/mongo.constant';
import { MongoQueryContainOptionsInterface } from '../interfaces/mongo.interface';

export function InjectMongoConnection(
  connectionName?: string,
): ParameterDecorator {
  return InjectConnection(connectionName ?? MONGO_CONNECTION_NAME);
}

export function InjectMongoModel(
  entity: any,
  connectionName?: string,
): ParameterDecorator {
  return InjectModel(entity, connectionName ?? MONGO_CONNECTION_NAME);
}

export function MongoEntity(options?: SchemaOptions): ClassDecorator {
  return Schema({
    ...options,
    timestamps: options?.timestamps ?? {
      createdAt: true,
      updatedAt: true,
    },
  });
}

export function MongoProp(options?: PropOptions<any>): PropertyDecorator {
  return Prop(options);
}

export function MongoSchema<T = any, N = MongooseSchema<T>>(
  entity: Type<T>,
): N {
  return SchemaFactory.createForClass<T>(entity) as N;
}

export function MongoHelperQueryContain(
  field: string,
  value: string,
  options?: MongoQueryContainOptionsInterface,
) {
  if (options?.fullWord) {
    return {
      [field]: {
        $regex: new RegExp(`\\b${value}\\b`),
        $options: 'i',
      },
    };
  }

  return {
    [field]: {
      $regex: new RegExp(value),
      $options: 'i',
    },
  };
}
