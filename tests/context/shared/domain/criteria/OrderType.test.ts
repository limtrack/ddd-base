import OrderType, { OrderTypes } from "../../../../../src/context/shared/domain/criteria/OrderType";
import InvalidArgumentError from "../../../../../src/context/shared/domain/error/InvalidArgumentError";

describe("OrderType", () => {
    describe("isType", () => {
        it("should return true when the type matches the value", () => {
            const orderType = OrderType.fromValue(OrderTypes.ASC);
            expect(orderType.isType(OrderTypes.ASC)).toBe(true);
        });

        it("should return false when the type does not match the value", () => {
            const orderType = OrderType.fromValue(OrderTypes.ASC);
            expect(orderType.isType(OrderTypes.DESC)).toBe(false);
        });

        it("should return false when the type is NONE and the value is ASC", () => {
            const orderType = OrderType.fromValue(OrderTypes.ASC);
            expect(orderType.isType(OrderTypes.NONE)).toBe(false);
        });

        it("should return true when the type is NONE and the value is NONE", () => {
            const orderType = OrderType.fromValue(OrderTypes.NONE);
            expect(orderType.isType(OrderTypes.NONE)).toBe(true);
        });

        it("should throw an error if the value is not valid", () => {
            expect(() => OrderType.fromValue("test")).toThrow(InvalidArgumentError);
        });
    });
});