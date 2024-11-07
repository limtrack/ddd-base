import InvalidArgumentError from "../../../../../src/context/shared/domain/error/InvalidArgumentError";

describe("InvalidArgumentError", () => {
    it("should create an instance of InvalidArgumentError with the correct properties", () => {
        const message = "Test error message";
        const error = new InvalidArgumentError(message);

        expect(error).toBeInstanceOf(InvalidArgumentError);
        expect(error.message).toBe(message);
        expect(error.name).toBe("InvalidArgumentError");
    });
});