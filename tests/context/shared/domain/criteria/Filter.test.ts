import Filter from "../../../../../src/context/shared/domain/criteria/Filter";
import FilterField from "../../../../../src/context/shared/domain/criteria/FilterField";
import FilterOperator, { Operator } from "../../../../../src/context/shared/domain/criteria/FilterOperator";
import FilterValue from "../../../../../src/context/shared/domain/criteria/FilterValue";
import InvalidArgumentError from "../../../../../src/context/shared/domain/error/InvalidArgumentError";

describe("Filter", () => {
    describe("fromValues", () => {
        it("should create a Filter instance when valid values are provided", () => {
            const values = new Map<string, string>([
                ["field", "name"],
                ["operator", Operator.EQUAL],
                ["value", "John"]
            ]);

            const filter = Filter.fromValues(values);

            expect(filter).toBeInstanceOf(Filter);
            expect(filter.field).toBeInstanceOf(FilterField);
            expect(filter.operator).toBeInstanceOf(FilterOperator);
            expect(filter.value).toBeInstanceOf(FilterValue);
            expect(filter.field.value).toBe("name");
            expect(filter.operator.value).toBe(Operator.EQUAL);
            expect(filter.value.value).toBe("John");
        });

        it("should throw InvalidArgumentError when field is missing", () => {
            const values = new Map<string, string>([
                ["operator", "equals"],
                ["value", "John"]
            ]);

            expect(() => Filter.fromValues(values)).toThrow(InvalidArgumentError);
        });

        it("should throw InvalidArgumentError when operator is missing", () => {
            const values = new Map<string, string>([
                ["field", "name"],
                ["value", "John"]
            ]);

            expect(() => Filter.fromValues(values)).toThrow(InvalidArgumentError);
        });

        it("should throw InvalidArgumentError when value is missing", () => {
            const values = new Map<string, string>([
                ["field", "name"],
                ["operator", "equals"]
            ]);

            expect(() => Filter.fromValues(values)).toThrow(InvalidArgumentError);
        });
    });
});