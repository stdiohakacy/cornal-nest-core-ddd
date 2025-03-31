import { BaseDomainEvent } from '../events/domain.event';
import { BaseDomainEventInterface } from '../events/domain.event.interface';
import { BaseUniqueEntityId } from '../identifier/unique-entity.id';
import { BaseEntity } from './base.entity';

export abstract class BaseAggregateRoot<T> extends BaseEntity<T> {
  private _domainEvents: BaseDomainEventInterface[] = [];

  get id(): BaseUniqueEntityId {
    return this._id;
  }

  get domainEvents(): BaseDomainEventInterface[] {
    return this._domainEvents;
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected addDomainEvent(domainEvent: BaseDomainEventInterface): void {
    const eventExisted = this._domainEvents.some(
      (event) => event.constructor.name === domainEvent.constructor.name,
    );

    if (!eventExisted) {
      this._domainEvents.push(domainEvent);
      BaseDomainEvent.markAggregateForDispatch(this);
      this.logDomainEventAdded(domainEvent);
    }
  }

  private logDomainEventAdded(domainEvent: BaseDomainEventInterface): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
