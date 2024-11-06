import Entity, { Props, PrimitivesProps } from "../../../../src/context/shared/domain/Entity";
import EntityError from "../../../../src/context/shared/domain/error/EntityError";
import NumberValueObject from "../../../../src/context/shared/domain/value-object/NumberValueObject";
import StringValueObject from "../../../../src/context/shared/domain/value-object/StringValueObject";

interface MockPrimitivesProps extends PrimitivesProps {
    id: number;
    name: string;
}

interface MockProps extends Props {
    id: NumberValueObject;
    name: StringValueObject;
}

class MockEntity extends Entity<MockPrimitivesProps, MockProps> {
    public static fromPrimitives<MockEntity>(props: MockPrimitivesProps): MockEntity {
        return new MockEntity({
            id: new NumberValueObject(props.id),
            name: new StringValueObject(props.name)
        }) as MockEntity;
    }
}

class MockEntityFromPrimitivesNoImplemented extends Entity<MockPrimitivesProps, MockProps> {}

describe("Entity", () => {
    it("should convert entity properties to primitives", () => {
        const props = { id: 123, name: "Mock Entity" };
        const entity = MockEntity.fromPrimitives<MockEntity>(props);
        const primitives = entity.toPrimitives();

        expect(primitives).toEqual(props);
    });

    it("should create entity from primitives", () => {
        const primitives = { id: 123, name: "Mock Entity" };
        const entity = MockEntity.fromPrimitives(primitives);

        expect(entity).toBeInstanceOf(MockEntity);
    });

    it("should throw an error with the correct message when the method `fromPrimitives` is not implemented", () => {
        try {
            const primitives = { id: 123, name: "Mock Entity" };
            MockEntityFromPrimitivesNoImplemented.fromPrimitives(primitives);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error).toBeInstanceOf(EntityError);
            expect(error.message).toBe("<fromPrimitives> method must be implemented");
        }
    });
});