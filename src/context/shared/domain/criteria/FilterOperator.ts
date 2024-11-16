import EnumValueObject from "../value-object/EnumValueObject";
import InvalidArgumentError from "../error/InvalidArgumentError";

export enum Operator {
  EQUAL = "=",
  NOT_EQUAL = "!=",
  GT = ">",
  LT = "<",
  CONTAINS = "CONTAINS"
}

export default class FilterOperator extends EnumValueObject<Operator> {
    constructor(value: Operator) {
        super(value, Object.values(Operator));
    }

    static fromValue(value: string): FilterOperator {
        for (const operatorValue of Object.values(Operator)) {
            if (value === operatorValue.toString()) {
                return new FilterOperator(operatorValue);
            }
        }

        throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
}