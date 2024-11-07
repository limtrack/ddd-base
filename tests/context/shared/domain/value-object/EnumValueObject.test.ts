import EnumValueObject from "../../../../../src/context/shared/domain/value-object/EnumValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";


enum TestEnum {
    VALID = "valid",
    INVALID = "invalid"
}

class TestEnumValueObject extends EnumValueObject<TestEnum> {}

describe("EnumValueObject", () => {
    it("should create an instance with a valid value", () => {
        const validValueObject = new TestEnumValueObject(TestEnum.VALID, [TestEnum.VALID, TestEnum.INVALID]);
        expect(validValueObject.value).toBe(TestEnum.VALID);
    });

    it("should throw an error with the correct message when the value is not in validValues", () => {
        try {
            new TestEnumValueObject(TestEnum.VALID, [TestEnum.INVALID]);
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValueObjectError);
            expect(error.message).toBe(`The <${TestEnum.VALID}> is not included in the <validValues> of TestEnumValueObject`);
        }
    });

    it("should return true when comparing two equal value objects", () => {
        const valueObject1 = new TestEnumValueObject(TestEnum.VALID, [TestEnum.VALID, TestEnum.INVALID]);
        const valueObject2 = new TestEnumValueObject(TestEnum.VALID, [TestEnum.VALID, TestEnum.INVALID]);
        expect(valueObject1.equals(valueObject2)).toBe(true);
    });

    it("should return false when comparing two different value objects", () => {
        const valueObject1 = new TestEnumValueObject(TestEnum.VALID, [TestEnum.VALID, TestEnum.INVALID]);
        const valueObject2 = new TestEnumValueObject(TestEnum.INVALID, [TestEnum.VALID, TestEnum.INVALID]);
        expect(valueObject1.equals(valueObject2)).toBe(false);
    });

    it("should return the string representation of the value", () => {
        const valueObject = new TestEnumValueObject(TestEnum.VALID, [TestEnum.VALID, TestEnum.INVALID]);
        expect(valueObject.toString()).toBe(TestEnum.VALID);
    });
});