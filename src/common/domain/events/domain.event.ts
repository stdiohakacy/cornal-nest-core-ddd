import { BaseAggregateRoot } from '../entities/aggregate-root';
import { BaseUniqueEntityId } from '../identifier/unique-entity.id';
import { BaseDomainEventInterface } from './domain.event.interface';

/**
 * @deprecated
 * @description
 * Should be removed because it's duplicate code with @nestjs/cqrs
 */
export class BaseDomainEvent {
  private static handlersMap: Record<
    string,
    Array<(event: BaseDomainEventInterface) => void>
  > = {};

  private static markedAggregates: Map<string, BaseAggregateRoot<unknown>> =
    new Map();

  public static markAggregateForDispatch<T>(
    aggregate: BaseAggregateRoot<T>,
  ): void {
    if (!this.markedAggregates.has(aggregate.id.toString())) {
      this.markedAggregates.set(
        aggregate.id.toString(),
        aggregate as BaseAggregateRoot<unknown>,
      );
    }
  }

  public static dispatchEventsForAggregate(id: BaseUniqueEntityId): void {
    const aggregate = this.findMarkedAggregateById(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = new Map<string, BaseAggregateRoot<unknown>>();
  }

  public static register<T extends BaseDomainEventInterface>(
    callback: (event: T) => void,
    eventClassName: string,
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(
      callback as (event: BaseDomainEventInterface) => void,
    );
  }

  private static async dispatchAggregateEvents<T>(
    aggregate: BaseAggregateRoot<T>,
  ): Promise<void> {
    for (const event of aggregate.domainEvents) {
      await this.dispatch(event);
    }
  }

  private static findMarkedAggregateById<T>(
    id: BaseUniqueEntityId,
  ): BaseAggregateRoot<T> | undefined {
    return this.markedAggregates.get(id.toString()) as
      | BaseAggregateRoot<T>
      | undefined;
  }

  private static removeAggregateFromMarkedDispatchList<T>(
    aggregate: BaseAggregateRoot<T>,
  ): void {
    this.markedAggregates.delete(aggregate.id.toString());
  }

  private static async dispatch(
    event: BaseDomainEventInterface,
  ): Promise<void> {
    const eventClassName: string = event.constructor.name;

    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      console.warn(`No handlers registered for event: ${eventClassName}`);
    } else {
      const handlers = this.handlersMap[eventClassName] as Array<
        (event: BaseDomainEventInterface) => void
      >;
      await Promise.all(handlers.map((handler) => handler(event)));
    }
  }
}
