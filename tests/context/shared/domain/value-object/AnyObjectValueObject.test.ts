import { isNil } from "lodash";
import AnyObjectValueObject from "../../../../../src/context/shared/domain/value-object/AnyObjectValueObject";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

type MockAnyObject = {
    id: number;
    name: string;
    isAdmin: boolean;
};

class MockAnyObjectValueObject extends AnyObjectValueObject<MockAnyObject> {
    protected valueIsDefined(): void {
        super.valueIsDefined();
        Object.entries(this.value).forEach(([key, value]) => {
            if (isNil(value)) {
                throw new ValueObjectError(`<${String(key)}> has not a valid value`, value, this.constructor.name);
            }
        });
    }
}

describe("MockAnyObjectValueObject", () => {
    it("should create a valid MockAnyObjectValueObject", () => {
        const mockAnyObject: MockAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObject = new MockAnyObjectValueObject(mockAnyObject);
        expect(anyObjectValueObject).toBeInstanceOf(MockAnyObjectValueObject);
    });

    it("should throw an error with the correct message when the value is not a correct object", () => {
        try {
            const mockAnyObject = {
                id: 12345,
                name: null,
                isAdmin: true
            };
            new MockAnyObjectValueObject(mockAnyObject as unknown as MockAnyObject);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error).toBeInstanceOf(ValueObjectError);
            expect(error.message).toBe("<name> has not a valid value");
        }
    });

    it("toString equals - no equal", () => {
        const mockAnyObjectA: MockAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const mockAnyObjectB: MockAnyObject = {
            id: 12346,
            name: "admin2",
            isAdmin: true
        };
        const anyObjectValueObjectA = new MockAnyObjectValueObject(mockAnyObjectA);
        const anyObjectValueObjectB = new MockAnyObjectValueObject(mockAnyObjectB);
        expect(anyObjectValueObjectA.equals(anyObjectValueObjectB)).toBeFalsy();
    });

    it("toString equals - equal", () => {
        const mockAnyObjectA: MockAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const mockAnyObjectB: MockAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObjectA = new MockAnyObjectValueObject(mockAnyObjectA);
        const anyObjectValueObjectB = new MockAnyObjectValueObject(mockAnyObjectB);
        expect(anyObjectValueObjectA.equals(anyObjectValueObjectB)).toBeTruthy();
    });

    it("MockAnyObjectValueObject like <string>", () => {
        const mockAnyObject: MockAnyObject = {
            id: 12345,
            name: "admin",
            isAdmin: true
        };
        const anyObjectValueObject = new MockAnyObjectValueObject(mockAnyObject);
        expect(anyObjectValueObject.toString()).toEqual('{"id":12345,"name":"admin","isAdmin":true}');
    });
});