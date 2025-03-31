import { DummyDomainEvent } from '../../events/__mock__/dummy.event';
import { BaseUniqueEntityId } from '../../identifier/unique-entity.id';
import { BaseAggregateRoot } from '../aggregate-root';

// Dummy aggregate to test base class
class DummyAggregate extends BaseAggregateRoot<{ name: string }> {
  get name() {
    return this.props.name;
  }

  public triggerDummyEvent() {
    const event = new DummyDomainEvent(this.id);
    this.addDomainEvent(event);
  }
}

describe('BaseAggregateRoot', () => {
  it('should instantiate and expose id', () => {
    const aggregate = new DummyAggregate({ name: 'Test' });
    expect(aggregate.id).toBeInstanceOf(BaseUniqueEntityId);
  });

  it('should add a domain event', () => {
    const aggregate = new DummyAggregate({ name: 'With Event' });
    const event = new DummyDomainEvent(aggregate.id);

    aggregate['addDomainEvent'](event);
    const events = aggregate.domainEvents;

    expect(events.length).toBe(1);
    expect(events[0]).toBe(event);
  });

  it('should prevent adding duplicate domain events of the same class', () => {
    const aggregate = new DummyAggregate({ name: 'Dup Event' });
    const event = new DummyDomainEvent(aggregate.id);

    aggregate['addDomainEvent'](event);
    aggregate['addDomainEvent'](event); // duplicate

    expect(aggregate.domainEvents.length).toBe(1);
  });

  it('should clear domain events', () => {
    const aggregate = new DummyAggregate({ name: 'Clear Events' });
    const event = new DummyDomainEvent(aggregate.id);

    aggregate['addDomainEvent'](event);
    expect(aggregate.domainEvents.length).toBe(1);

    aggregate.clearEvents();
    expect(aggregate.domainEvents.length).toBe(0);
  });

  it('should register domain event via trigger method', () => {
    const aggregate = new DummyAggregate({ name: 'Trigger' });

    aggregate.triggerDummyEvent();

    const events = aggregate.domainEvents;
    expect(events.length).toBe(1);
    expect(events[0]).toBeInstanceOf(DummyDomainEvent);
    expect(events[0].getAggregateRootId().toValue()).toBe(
      aggregate.id.toValue(),
    );
  });
});
