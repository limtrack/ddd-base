import EnumValueObject from "../value-object/EnumValueObject";
import InvalidArgumentError from "../error/InvalidArgumentError";

export enum OrderTypes {
  ASC = "asc",
  DESC = "desc",
  NONE = "none"
}

export default class OrderType extends EnumValueObject<OrderTypes> {
    constructor(value: OrderTypes) {
        super(value, Object.values(OrderTypes));
    }

    static fromValue(value: string): OrderType {
        for (const orderTypesValues of Object.values(OrderTypes)) {
            if (value === orderTypesValues.toString()) {
                return new OrderType(orderTypesValues);
            }
        }

        throw new InvalidArgumentError(`The order type ${value} is invalid`);
    }

    public isType(type: OrderTypes): boolean {
        return this.value === type;
    }
}