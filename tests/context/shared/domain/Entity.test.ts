import TestEntity from "../../../__mocks__/TestEntity";
import TestEntityFromPrimitivesNoImplemented from "../../../__mocks__/TestEntityFromPrimitivesNoImplemented";
import EntityError from "../../../../src/context/shared/domain/error/EntityError";

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
        } catch (error: unknown) {
            if (error instanceof EntityError) {
                expect(error).toBeInstanceOf(EntityError);
                expect(error.message).toBe("<fromPrimitives> method must be implemented");
            } else {
                throw error;
            }
        }
    });
});