import { Props, PrimitivesProps } from "../../src/context/shared/domain/Entity";
import AggregateRoot from "../../src/context/shared/domain/AggregateRoot";
import NumberValueObject from "../../src/context/shared/domain/value-object/NumberValueObject";
import StringValueObject from "../../src/context/shared/domain/value-object/StringValueObject";

interface TestPrimitivesProps extends PrimitivesProps {
    id: number;
    name: string;
}

interface TestProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

export default class TestAggregateRoot extends AggregateRoot<TestProps, TestProps> {
    public static fromPrimitives<TestEntity>(props: TestPrimitivesProps): TestEntity {
        return new TestAggregateRoot({
            id: new NumberValueObject(props.id),
            name: new StringValueObject(props.name)
        }) as TestEntity;
    }
}