import DateValueObject from "../../../../../src/context/shared/domain/value-object/DateValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("DateValueObject", () => {
    it("should create a valid DateValueObject", () => {
        const value = new Date();
        const dateValueObject = new DateValueObject(value);
        expect(dateValueObject).toBeInstanceOf(DateValueObject);
    });

    it("should throw an error with the correct message when the value is not a date", () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new DateValueObject(true as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValueObjectError);
            expect(error.message).toBe("<true> is not a Date value");
        }
    });

    it("toString equals - no equal", () => {
        const dateValueObjectA = new DateValueObject(new Date("2024-01-01"));
        const dateValueObjectB = new DateValueObject(new Date("2024-01-02"));
        expect(dateValueObjectA.equals(dateValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const dateValueObjectA = new DateValueObject(new Date("2024-01-01"));
        const dateValueObjectB = new DateValueObject(new Date("2024-01-01"));
        expect(dateValueObjectA.equals(dateValueObjectB)).toBeTruthy();
    });

    it("toString function", () => {
        const value = new Date("2024-01-01");
        const dateValueObject = new DateValueObject(value);
        expect(dateValueObject.toString()).toEqual("2024-01-01T00:00:00.000Z");
    });

});