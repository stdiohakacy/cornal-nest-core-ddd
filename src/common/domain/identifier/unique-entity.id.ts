import { BaseIdentifier } from './Identifier';
import { v4 as uuid } from 'uuid';

export class BaseUniqueEntityId extends BaseIdentifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuid());
  }
}
