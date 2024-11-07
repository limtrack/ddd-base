import Entity, { PrimitivesProps, Props } from "./Entity"
import DomainEvent from "./event/DomainEvent"

export default abstract class AggregateRoot<PP extends PrimitivesProps, P extends Props> extends Entity<PP, P> {
    private domainEvents: DomainEvent[]

    protected constructor(props: P) {
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
