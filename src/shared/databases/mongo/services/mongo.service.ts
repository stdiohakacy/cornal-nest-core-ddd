import { Injectable } from '@nestjs/common';
import { MongoServiceInterface } from './mongo.service.interface';
import { MongoHelperQueryContain } from '../decorators/mongo.decorator';

@Injectable()
export class MongoService implements MongoServiceInterface {
  filterEqual<T = string>(
    field: string,
    filterValue: T,
  ): Record<string, { $eq: T }> {
    return {
      [field]: {
        $eq: filterValue,
      },
    };
  }

  filterNotEqual<T = string>(
    field: string,
    filterValue: T,
  ): Record<string, { $ne: T }> {
    return {
      [field]: {
        $ne: filterValue,
      },
    };
  }

  filterContain(field: string, filterValue: string): Record<string, any> {
    return MongoHelperQueryContain(field, filterValue);
  }

  filterContainFullMatch(
    field: string,
    filterValue: string,
  ): Record<string, any> {
    return MongoHelperQueryContain(field, filterValue, {
      fullWord: true,
    });
  }

  filterIn<T = string>(
    field: string,
    filterValue: T[],
  ): Record<string, { $in: T[] }> {
    return {
      [field]: {
        $in: filterValue,
      },
    };
  }

  filterNin<T = string>(
    field: string,
    filterValue: T[],
  ): Record<
    string,
    {
      $nin: T[];
    }
  > {
    return {
      [field]: {
        $nin: filterValue,
      },
    };
  }

  filterDateBetween(
    fieldStart: string,
    fieldEnd: string,
    filterStartValue: Date,
    filterEndValue: Date,
  ): Record<string, any> {
    if (fieldStart === fieldEnd) {
      return {
        [fieldStart]: {
          $gte: filterStartValue,
          $lte: filterEndValue,
        },
      };
    }

    return {
      [fieldStart]: {
        $gte: filterStartValue,
      },
      [fieldEnd]: {
        $lte: filterEndValue,
      },
    };
  }
}
