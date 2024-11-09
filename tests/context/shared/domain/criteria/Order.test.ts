import Order from "../../../../../src/context/shared/domain/criteria/Order";
import { OrderTypes } from "../../../../../src/context/shared/domain/criteria/OrderType";

describe("Order", () => {
    describe("fromValues", () => {
        it("should return an Order with OrderType.NONE when orderBy is not provided", () => {
            const order = Order.fromValues();

            expect(order.orderBy.value).toBe("");
            expect(order.orderType.isType(OrderTypes.NONE)).toBe(true);
        });

        it("should return an Order with OrderType.ASC when orderType is not provided", () => {
            const orderBy = "name";
            const order = Order.fromValues(orderBy);

            expect(order.orderBy.value).toBe(orderBy);
            expect(order.orderType.isType(OrderTypes.ASC)).toBe(true);
        });

        it("should return an Order with the provided orderBy and orderType", () => {
            const orderBy = "name";
            const orderType = OrderTypes.DESC;
            const order = Order.fromValues(orderBy, orderType);

            expect(order.orderBy.value).toBe(orderBy);
            expect(order.orderType.isType(orderType)).toBe(true);
        });

        it("should return false when orderBy is not provided", () => {
            const order = Order.fromValues();

            expect(order.orderBy.value).toBe("");
            expect(order.hasOrder()).toBe(false);
        });
    });
});