import { BaseUniqueEntityId } from '../../identifier/unique-entity.id';
import { BaseDomainEventInterface } from '../domain.event.interface';

export class DummyDomainEvent implements BaseDomainEventInterface {
  public readonly dateTimeOccurred: Date = new Date();
  constructor(public readonly aggregateId: BaseUniqueEntityId) {}

  getAggregateRootId(): BaseUniqueEntityId {
    return this.aggregateId;
  }

  toJSON() {
    return {
      aggregateId: this.aggregateId.toString(),
      dateTimeOccurred: this.dateTimeOccurred.toISOString(),
    };
  }
}
