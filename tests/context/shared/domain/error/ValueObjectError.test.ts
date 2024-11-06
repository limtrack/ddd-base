import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("ValueObjectError", () => {
    it("should create an instance of ValueObjectError with the correct properties", () => {
        const message = "Test error message";
        const value = "Test value";
        const type = "Test type";
        const error = new ValueObjectError(message, value, type);

        expect(error).toBeInstanceOf(ValueObjectError);
        expect(error.message).toBe(message);
        expect(error.name).toBe("ValueObjectError");
        expect(error.type).toBe(type);
        expect(error.value).toBe(value);
    });
});