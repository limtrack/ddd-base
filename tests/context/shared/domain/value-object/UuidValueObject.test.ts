import UuidValueObject from "../../../../../src/context/shared/domain/value-object/UuidValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";


describe("UuidValueObject", () => {
    it("should create a UuidValueObject with a valid uuid value", () => {
        const uuidValueObject = new UuidValueObject("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
        expect(uuidValueObject).toBeInstanceOf(UuidValueObject);
    });

    it("should throw an error with the correct message when the value is not a uuid", () => {
        try {
            new UuidValueObject("not a uuid" as unknown as string);
        } catch (error: unknown) {
            if (error instanceof ValueObjectError) {
                expect(error).toBeInstanceOf(ValueObjectError);
                expect(error.message).toBe("<not a uuid> is not a valid uuid");
            } else {
                throw error;
            }
        }
    });

    it("toString equals - no equal", () => {
        const uuidValueObjectA = new UuidValueObject("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
        const uuidValueObjectB = new UuidValueObject("7da3f0f7-cdd7-49f5-bd3e-a50ca0024d5d");
        expect(uuidValueObjectA.equals(uuidValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const uuidValueObjectA = new UuidValueObject("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
        const uuidValueObjectB = new UuidValueObject("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
        expect(uuidValueObjectA.equals(uuidValueObjectB)).toBeTruthy();
    });

    it("UuidValueObject like <string>", () => {
        const uuidValueObject = new UuidValueObject("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
        expect(uuidValueObject.toString()).toEqual("1ff4ff64-cb9e-4e75-8931-fdbd477639ed");
    });

    it("UuidValueObject genrate a validate ramdom uuid", () => {
        const randomUuidValueObject = UuidValueObject.random();
        const uuidValueObject = new UuidValueObject(randomUuidValueObject.toString());
        expect(uuidValueObject).toBeInstanceOf(UuidValueObject);
    });
});