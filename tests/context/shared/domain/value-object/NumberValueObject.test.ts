import NumberValueObject from "../../../../../src/context/shared/domain/value-object/NumberValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("NumberValueObject", () => {
    it("should create a valid NumberValueObject", () => {
        const value = 123;
        const numberValueObject = new NumberValueObject(value);
        expect(numberValueObject).toBeInstanceOf(NumberValueObject);
    });

    it("should throw an error with the correct message when the value is not a number", () => {
        try {
            new NumberValueObject(true  as unknown as number);
        } catch (error: unknown) {
            if (error instanceof ValueObjectError) {
                expect(error).toBeInstanceOf(ValueObjectError);
                expect(error.message).toBe("<true> is not a number value");
            } else {
                throw error;
            }
        }
    });

    it("toString equals - no equal", () => {
        const numberValueObjectA = new NumberValueObject(1);
        const numberValueObjectB = new NumberValueObject(2);
        expect(numberValueObjectA.equals(numberValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const numberValueObjectA = new NumberValueObject(1);
        const numberValueObjectB = new NumberValueObject(1);
        expect(numberValueObjectA.equals(numberValueObjectB)).toBeTruthy();
    });

    it("NumberValueObject like <string>", () => {
        const numberValueObject = new NumberValueObject(123);
        expect(numberValueObject.toString()).toEqual("123");
    });
});