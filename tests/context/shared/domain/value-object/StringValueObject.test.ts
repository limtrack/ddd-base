import BooleanValueObject from "../../../../../src/context/shared/domain/value-object/BooleanValueObject";
import StringValueObject from "../../../../../src/context/shared/domain/value-object/StringValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("StringValueObject", () => {
    it("should create a valid StringValueObject", () => {
        const value = "validString";
        const stringValueObject = new StringValueObject(value);
        expect(stringValueObject).toBeInstanceOf(StringValueObject);
    });

    it("should throw an error if value is an empty string", () => {
        expect(() => new StringValueObject("")).toThrow(ValueObjectError);
    });

    it("should throw an error with the correct message when the value is undefined", () => {
        try {
            new StringValueObject(undefined as unknown as string);
        } catch (error: unknown) {
            if (error instanceof ValueObjectError) {
                expect(error).toBeInstanceOf(ValueObjectError);
                expect(error.message).toBe("The <value> of StringValueObject must be defined");
            } else {
                throw error;
            }
        }

    });

    it("should throw an error with the correct message when the value is not a string", () => {
        try {
            new StringValueObject(123 as unknown as string);
        } catch (error: unknown) {
            if (error instanceof ValueObjectError) {
                expect(error).toBeInstanceOf(ValueObjectError);
                expect(error.message).toBe("<123> is not a string value");
            } else {
                throw error;
            }
        }
    });

    it("toString equals - no equal (different object)", () => {
        const booleanValueObject = new BooleanValueObject(true);
        const stringValueObject = new StringValueObject("bye");

        expect(stringValueObject.equals(booleanValueObject as unknown as StringValueObject)).toBeFalsy();
    });

    it("toString equals - no equal", () => {
        const stringValueObjectA = new StringValueObject("hello");
        const stringValueObjectB = new StringValueObject("bye");
        expect(stringValueObjectA.equals(stringValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const stringValueObjectA = new StringValueObject("hello");
        const stringValueObjectB = new StringValueObject("hello");
        expect(stringValueObjectA.equals(stringValueObjectB)).toBeTruthy();
    });

    it("StringValueObject like <string>", () => {
        const stringValueObject = new StringValueObject("123");
        expect(stringValueObject.toString()).toEqual("123");
    });
});