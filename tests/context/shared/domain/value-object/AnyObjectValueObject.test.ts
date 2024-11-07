import { isNil } from "lodash";
import AnyObjectValueObject from "../../../../../src/context/shared/domain/value-object/AnyObjectValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

type TestAnyObject = {
    id: number;
    name: string;
    isAdmin: boolean;
};

class TestAnyObjectValueObject extends AnyObjectValueObject<TestAnyObject> {
    protected valueIsDefined(): void {
        super.valueIsDefined();
        Object.entries(this.value).forEach(([key, value]) => {
            if (isNil(value)) {
                throw new ValueObjectError(`<${String(key)}> has not a valid value`, value, this.constructor.name);
            }
        });
    }
}

describe("TestAnyObjectValueObject", () => {
    it("should create a valid TestAnyObjectValueObject", () => {
        const mockAnyObject: TestAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObject = new TestAnyObjectValueObject(mockAnyObject);
        expect(anyObjectValueObject).toBeInstanceOf(TestAnyObjectValueObject);
    });

    it("should throw an error with the correct message when the value is not a correct object", () => {
        try {
            const mockAnyObject = {
                id: 12345,
                name: null,
                isAdmin: true
            };
            new TestAnyObjectValueObject(mockAnyObject as unknown as TestAnyObject);
        } catch (error: unknown) {
            if (error instanceof ValueObjectError) {
                expect(error).toBeInstanceOf(ValueObjectError);
                expect(error.message).toBe("<name> has not a valid value");
            } else {
                throw error;
            }
        }
    });

    it("toString equals - no equal", () => {
        const mockAnyObjectA: TestAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const mockAnyObjectB: TestAnyObject = {
            id: 12346,
            name: "admin2",
            isAdmin: true
        };
        const anyObjectValueObjectA = new TestAnyObjectValueObject(mockAnyObjectA);
        const anyObjectValueObjectB = new TestAnyObjectValueObject(mockAnyObjectB);
        expect(anyObjectValueObjectA.equals(anyObjectValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const mockAnyObjectA: TestAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const mockAnyObjectB: TestAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObjectA = new TestAnyObjectValueObject(mockAnyObjectA);
        const anyObjectValueObjectB = new TestAnyObjectValueObject(mockAnyObjectB);
        expect(anyObjectValueObjectA.equals(anyObjectValueObjectB)).toBeTruthy();
    });

    it("TestAnyObjectValueObject like <string>", () => {
        const mockAnyObject: TestAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObject = new TestAnyObjectValueObject(mockAnyObject);
        expect(anyObjectValueObject.toString()).toEqual('{"id":12345,"name":"admin","isAdmin":true}');
    });
});