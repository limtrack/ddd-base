import { Props, PrimitivesProps } from "../../../../src/context/shared/domain/Entity";
import AggregateRoot from '../../../../src/context/shared/domain/AggregateRoot';
import DomainEvent from '../../../../src/context/shared/domain/event/DomainEvent';
import NumberValueObject from '../../../../src/context/shared/domain/value-object/NumberValueObject';
import StringValueObject from '../../../../src/context/shared/domain/value-object/StringValueObject';

interface TestPrimitivesProps extends PrimitivesProps {
    id: number;
    name: string;
}

interface TestProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

class TestAggregateRoot extends AggregateRoot<TestProps, TestProps> {
    public static fromPrimitives<TestEntity>(props: TestPrimitivesProps): TestEntity {
        return new TestAggregateRoot({
            id: new NumberValueObject(props.id),
            name: new StringValueObject(props.name)
        }) as TestEntity;
    }
}

describe('AggregateRoot', () => {
    let aggregateRoot: TestAggregateRoot;
    let domainEvent: DomainEvent;

    beforeEach(() => {
        aggregateRoot = TestAggregateRoot.fromPrimitives({ id: 1, name: 'Test' });
        domainEvent = { eventName: 'TestAggregateRoot', occurredOn: new Date() };
    });

    it('should record a domain event', () => {
        aggregateRoot.record(domainEvent);
        expect(aggregateRoot.pullDomainEvents()).toEqual([domainEvent]);
    });

    it('should pull domain events and clear them', () => {
        aggregateRoot.record(domainEvent);
        const events = aggregateRoot.pullDomainEvents();
        expect(events).toEqual([domainEvent]);
        expect(aggregateRoot.pullDomainEvents()).toEqual([]);
    });
});