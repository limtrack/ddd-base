import EnumValueObject from "../value-object/EnumValueObject";

export enum OrderTypes {
  ASC = "asc",
  DESC = "desc",
  NONE = "none"
}

export default class OrderType extends EnumValueObject<OrderTypes> {
    static fromValue(type: OrderTypes | string): OrderType {
        return new OrderType(type as OrderTypes, Object.values(OrderTypes));
    }

    public isType(type: OrderTypes): boolean {
        return this.value === type;
    }
}