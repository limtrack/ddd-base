import DomainEvent, { DomainEventSubscriber } from "./DomainEvent"

export default interface EventBus {
    publish: (events: DomainEvent[]) => Promise<void>
    addSubscribers: (subscribers: Array<DomainEventSubscriber<DomainEvent>>) => void
}
