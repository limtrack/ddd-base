import BooleanValueObject from "../../../../../src/context/shared/domain/value-object/BooleanValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";


describe("BooleanValueObject", () => {
    it("should create a BooleanValueObject with a valid boolean value", () => {
        const booleanValueObject = new BooleanValueObject(true);
        expect(booleanValueObject).toBeInstanceOf(BooleanValueObject);
    });

    it("should throw an error with the correct message when the value is not a boolean", () => {
        try {
            new BooleanValueObject("not a boolean" as any);
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValueObjectError);
            expect(error.message).toBe("<not a boolean> is not a boolean value");
        }
    });

    it("should throw an error with the correct message when the value is undefined", () => {
        try {
            new BooleanValueObject(undefined as any);
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValueObjectError);
            expect(error.message).toBe("The <value> of BooleanValueObject must be defined");
        }
    });

    it("toString equals - no equal", () => {
        const booleanValueObjectA = new BooleanValueObject(true);
        const booleanValueObjectB = new BooleanValueObject(false);
        expect(booleanValueObjectA.equals(booleanValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const booleanValueObjectA = new BooleanValueObject(false);
        const booleanValueObjectB = new BooleanValueObject(false);
        expect(booleanValueObjectA.equals(booleanValueObjectB)).toBeTruthy();
    });

    it("BooleanValueObject like <string>", () => {
        const booleanValueObject = new BooleanValueObject(true);
        expect(booleanValueObject.toString()).toEqual("true");
    });
});