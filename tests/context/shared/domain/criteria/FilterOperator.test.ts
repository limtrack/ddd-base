import FilterOperator, { Operator } from "../../../../../src/context/shared/domain/criteria/FilterOperator";
import InvalidArgumentError from "../../../../../src/context/shared/domain/error/InvalidArgumentError";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("FilterOperator", () => {
    it("should create a FilterOperator with a valid value", () => {
        const operator = new FilterOperator(Operator.EQUAL);
        expect(operator.value).toBe(Operator.EQUAL);
    });

    it("should throw an error for an invalid value", () => {
        expect(() => new FilterOperator("INVALID" as Operator)).toThrow(ValueObjectError);
    });

    it("should create a FilterOperator from a valid string value", () => {
        const operator = FilterOperator.fromValue("=");
        expect(operator.value).toBe(Operator.EQUAL);
    });

    it("should create a FilterOperator with NOT_CONTAINS value", () => {
        const operator = new FilterOperator(Operator.NOT_CONTAINS);
        expect(operator.value).toBe(Operator.NOT_CONTAINS);
    });

    it("should throw an error when creating a FilterOperator from an invalid string value", () => {
        expect(() => FilterOperator.fromValue("INVALID")).toThrow(InvalidArgumentError);
    });

});