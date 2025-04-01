import { PickType } from '@nestjs/swagger';
import { MongoDto } from '../mongo.dto';

export class MongoIdResponseDto extends PickType(MongoDto, ['_id'] as const) {}
