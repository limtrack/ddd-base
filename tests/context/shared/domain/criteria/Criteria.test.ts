import Criteria from "../../../../../src/context/shared/domain/criteria/Criteria";
import Filters from "../../../../../src/context/shared/domain/criteria/Filters";
import { Operator } from "../../../../../src/context/shared/domain/criteria/FilterOperator";
import Order from "../../../../../src/context/shared/domain/criteria/Order";
import OrderBy from "../../../../../src/context/shared/domain/criteria/OrderBy";
import OrderType from "../../../../../src/context/shared/domain/criteria/OrderType";

describe("Criteria", () => {
    it("should create an instance with given parameters", () => {
        const filters = [new Filters([])];
        const order = new Order(new OrderBy("field"), OrderType.fromValue("asc"));
        const limit = 10;
        const offset = 5;
        const criteria = new Criteria(filters, order, limit, offset);

        expect(criteria).toBeInstanceOf(Criteria);
        expect(criteria.filters).toBe(filters);
        expect(criteria.order).toBe(order);
        expect(criteria.limit).toBe(limit);
        expect(criteria.offset).toBe(offset);
    });

    it("should create an instance with only filters", () => {
        const filters = [new Filters([])];

        const criteria = new Criteria(filters);

        expect(criteria).toBeInstanceOf(Criteria);
        expect(criteria.filters).toBe(filters);
        expect(criteria.order).toBeUndefined();
        expect(criteria.limit).toBeUndefined();
        expect(criteria.offset).toBeUndefined();
    });

    it("should return false if there are no filters", () => {
        const filters = [new Filters([])];
        const criteria = new Criteria(filters);

        expect(criteria.hasFilters()).toBe(false);
    });

    it("should return true if there are filters", () => {
        const filterOne = new Map<string, string>([
            ["field", "test"],
            ["operator", Operator.EQUAL],
            ["value", "one"]
        ]);
        const filters = Filters.fromValues([filterOne]);
        const criteria = new Criteria([filters]);

        expect(criteria.hasFilters()).toBe(true);
    });
});