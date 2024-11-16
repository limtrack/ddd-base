import Entity, { Props, PrimitivesProps } from "../../src/context/shared/domain/Entity";
import NumberValueObject from "../../src/context/shared/domain/value-object/NumberValueObject";
import StringValueObject from "../../src/context/shared/domain/value-object/StringValueObject";

interface TestPrimitivesFromPrimitivesNoImplementedProps extends PrimitivesProps {
    id: number;
    name: string;
}

interface TestFromPrimitivesNoImplementedProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

export default class TestEntityFromPrimitivesNoImplemented
    extends Entity<TestPrimitivesFromPrimitivesNoImplementedProps, TestFromPrimitivesNoImplementedProps> {}