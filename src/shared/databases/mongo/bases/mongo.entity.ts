import { v4 as uuidV4 } from 'uuid';
import { MongoProp } from '../decorators/mongo.decorator';

export class MongoOrmEntity {
  @MongoProp({
    type: String,
    default: uuidV4,
  })
  _id: string;

  @MongoProp({
    required: true,
    index: true,
    default: false,
  })
  deleted: boolean;

  @MongoProp({
    required: false,
    index: 'asc',
    type: Date,
    default: new Date(),
  })
  createdAt?: Date;

  @MongoProp({
    required: false,
    index: true,
  })
  createdBy?: string;

  @MongoProp({
    required: false,
    index: 'asc',
    type: Date,
    default: new Date(),
  })
  updatedAt?: Date;

  @MongoProp({
    required: false,
    index: true,
  })
  updatedBy?: string;

  @MongoProp({
    required: false,
    index: true,
    type: Date,
  })
  deletedAt?: Date;

  @MongoProp({
    required: false,
    index: true,
  })
  deletedBy?: string;
}
