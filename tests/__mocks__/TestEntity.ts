import Entity, { Props, PrimitivesProps } from "../../src/context/shared/domain/Entity";
import NumberValueObject from "../../src/context/shared/domain/value-object/NumberValueObject";
import StringValueObject from "../../src/context/shared/domain/value-object/StringValueObject";

export interface TestPrimitivesProps extends PrimitivesProps {
    id: number;
    name: string;
}

export interface TestProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

export default class TestEntity extends Entity<TestPrimitivesProps, TestProps> {
    public static fromPrimitives<TestEntity>(props: TestPrimitivesProps): TestEntity {
        return new TestEntity({
            id: new NumberValueObject(props.id),
            name: new StringValueObject(props.name)
        }) as TestEntity;
    }
}