export default class DomainEvent {
    public readonly occurredOn: Date

    protected constructor(
      public readonly eventName: string,
      occurredOn?: Date
    ) {
        this.occurredOn = occurredOn ?? new Date()
    }
}

export type DomainEventName<T extends DomainEvent> = Pick<T, "eventName">

export interface DomainEventSubscriber<T extends DomainEvent> {
    on: (domainEvent: T) => Promise<void>
    subscribedTo: () => Array<DomainEventName<T>>
}