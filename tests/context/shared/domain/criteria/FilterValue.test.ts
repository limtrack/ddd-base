import FilterValue from "../../../../../src/context/shared/domain/criteria/FilterValue";
import ValueObjectError from "../../../../../src/context/shared/domain/error/ValueObjectError";

describe("FilterValue", () => {
    describe("valueIsDefined", () => {
        it("should not throw an error if the value is a string", () => {
            const filterValue = new FilterValue("validString");
            expect(() => filterValue["valueIsDefined"]()).not.toThrow();
        });

        it("should not throw an error if the value is a number", () => {
            const filterValue = new FilterValue(123);
            expect(() => filterValue["valueIsDefined"]()).not.toThrow();
        });

        it("should throw an error if the value is neither string nor number", () => {
            expect(() => new FilterValue(true as unknown as string)).toThrow(ValueObjectError);
        });
    });
});