import EntityError from "../../../../../src/context/shared/domain/error/EntityError";

describe("EntityError", () => {
    it("should create an instance of EntityError with the correct properties", () => {
        const message = "Test error message";
        const error = new EntityError(message);

        expect(error).toBeInstanceOf(EntityError);
        expect(error.message).toBe(message);
        expect(error.name).toBe("EntityError");
    });
});