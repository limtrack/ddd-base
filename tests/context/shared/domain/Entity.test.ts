import Entity, { Props, PrimitivesProps } from "../../../../src/context/shared/domain/Entity";
import EntityError from "../../../../src/context/shared/domain/error/EntityError";
import NumberValueObject from "../../../../src/context/shared/domain/value-object/NumberValueObject";
import StringValueObject from "../../../../src/context/shared/domain/value-object/StringValueObject";

interface TestPrimitivesProps extends PrimitivesProps {
    id: number;
    name: string;
}

interface TestProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

class TestEntity extends Entity<TestPrimitivesProps, TestProps> {
    public static fromPrimitives<TestEntity>(props: TestPrimitivesProps): TestEntity {
        return new TestEntity({
            id: new NumberValueObject(props.id),
            name: new StringValueObject(props.name)
        }) as TestEntity;
    }
}

class TestEntityFromPrimitivesNoImplemented extends Entity<TestPrimitivesProps, TestProps> {}

describe("Entity", () => {
    it("should convert entity properties to primitives", () => {
        const props = { id: 123, name: "Test Entity" };
        const entity = TestEntity.fromPrimitives<TestEntity>(props);
        const primitives = entity.toPrimitives();

        expect(primitives).toEqual(props);
    });

    it("should create entity from primitives", () => {
        const primitives = { id: 123, name: "Test Entity" };
        const entity = TestEntity.fromPrimitives(primitives);

        expect(entity).toBeInstanceOf(TestEntity);
    });

    it("should throw an error with the correct message when the method `fromPrimitives` is not implemented", () => {
        try {
            const primitives = { id: 123, name: "Test Entity" };
            TestEntityFromPrimitivesNoImplemented.fromPrimitives(primitives);
        } catch (error: any) {
            expect(error).toBeInstanceOf(EntityError);
            expect(error.message).toBe("<fromPrimitives> method must be implemented");
        }
    });
});