import InMemoryCriteriaConverter from "../../../../src/context/shared/infrastructure/criteria/InMemoryCriteriaConverter";
import Criteria from "../../../../src/context/shared/domain/criteria/Criteria";
import Filters from "../../../../src/context/shared/domain/criteria/Filters";
import Filter from "../../../../src/context/shared/domain/criteria/Filter";
import FilterField from "../../../../src/context/shared/domain/criteria/FilterField";
import FilterOperator from "../../../../src/context/shared/domain/criteria/FilterOperator"; 
import FilterValue from "../../../../src/context/shared/domain/criteria/FilterValue";
import Order from "../../../../src/context/shared/domain/criteria/Order";
import OrderType, { OrderTypes } from "../../../../src/context/shared/domain/criteria/OrderType";
import { Operator } from "../../../../src/context/shared/domain/criteria/FilterOperator";
import OrderBy from "../../../../src/context/shared/domain/criteria/OrderBy";

describe("InMemoryCriteriaConverter", () => {
    let converter: InMemoryCriteriaConverter;

    beforeEach(() => {
        converter = new InMemoryCriteriaConverter();
    });

    it("should filter data based on EQUAL operator", () => {
        const criteria = new Criteria(
            new Filters([new Filter(new FilterField("field"), new FilterOperator(Operator.EQUAL), new FilterValue("value"))]),
            undefined,
            undefined,
            undefined
        );

        const data = [{ field: "value" }, { field: "other" }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: "value" }]);
    });

    it("should filter data based on NOT_EQUAL operator", () => {
        const criteria = new Criteria(
            new Filters([new Filter(new FilterField("field"), new FilterOperator(Operator.NOT_EQUAL), new FilterValue("value"))]),
            undefined,
            undefined,
            undefined
        );

        const data = [{ field: "value" }, { field: "other" }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: "other" }]);
    });

    it("should filter data based on GT operator", () => {
        const criteria = new Criteria(
            new Filters([new Filter(new FilterField("field"), new FilterOperator(Operator.GT), new FilterValue(10))]),
            undefined,
            undefined,
            undefined
        );

        const data = [{ field: 5 }, { field: 15 }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: 15 }]);
    });

    it("should filter data based on LT operator", () => {
        const criteria = new Criteria(
            new Filters([new Filter(new FilterField("field"), new FilterOperator(Operator.LT), new FilterValue(10))]),
            undefined,
            undefined,
            undefined
        );

        const data = [{ field: 5 }, { field: 15 }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: 5 }]);
    });

    it("should filter data based on CONTAINS operator", () => {
        const criteria = new Criteria(
            new Filters([new Filter(new FilterField("field"), new FilterOperator(Operator.CONTAINS), new FilterValue("value"))]),
            undefined,
            undefined,
            undefined
        );

        const data = [{ field: ["value"] }, { field: ["other"] }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: ["value"] }]);
    });

    it("should order data based on ASC order", () => {
        const criteria = new Criteria(
            new Filters([]),
            new Order(new OrderBy("field"), OrderType.fromValue(OrderTypes.ASC)),
            undefined,
            undefined
        );

        const data = [{ field: 2 }, { field: 1 }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: 1 }, { field: 2 }]);
    });

    it("should order data based on DESC order", () => {
        const criteria = new Criteria(
            new Filters([]),
            new Order(new OrderBy("field"), OrderType.fromValue(OrderTypes.DESC)),
            undefined,
            undefined
        );

        const data = [{ field: 1 }, { field: 2 }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: 2 }, { field: 1 }]);
    });

    it("should slice data based on offset and limit", () => {
        const criteria = new Criteria(
            new Filters([]),
            undefined,
            1,
            1
        );

        const data = [{ field: 1 }, { field: 2 }, { field: 3 }];
        const result = converter.convert(criteria)(data);

        expect(result).toEqual([{ field: 2 }]);
    });
});