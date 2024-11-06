import Entity from "./Entity"
import DomainEvent from "./event/DomainEvent"

export abstract class AggregateRoot<P extends object, T extends object> extends Entity<P, T> {
    private domainEvents: DomainEvent[]

    private constructor(props: T) {
        super(props)
        this.domainEvents = []
    }

    pullDomainEvents(): DomainEvent[] {
        const domainEvents = this.domainEvents.slice()
        this.domainEvents = []

        return domainEvents
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event)
    }
}
