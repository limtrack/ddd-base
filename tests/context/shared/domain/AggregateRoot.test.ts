import TestAggregateRoot from "../../../__mocks__/TestAggregateRoot";
import DomainEvent from "../../../../src/context/shared/domain/event/DomainEvent";

describe("AggregateRoot", () => {
    let aggregateRoot: TestAggregateRoot;
    let domainEvent: DomainEvent;

    beforeEach(() => {
        aggregateRoot = TestAggregateRoot.fromPrimitives({ id: 1, name: "Test" });
        domainEvent = { eventName: "TestAggregateRoot", occurredOn: new Date() };
    });

    it("should record a domain event", () => {
        aggregateRoot.record(domainEvent);
        expect(aggregateRoot.pullDomainEvents()).toEqual([domainEvent]);
    });

    it("should pull domain events and clear them", () => {
        aggregateRoot.record(domainEvent);
        const events = aggregateRoot.pullDomainEvents();
        expect(events).toEqual([domainEvent]);
        expect(aggregateRoot.pullDomainEvents()).toEqual([]);
    });
});