import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class DateValueObject extends ValueObject<Date> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (!DateValueObject.isValidDate(this.value)) {
          throw new ValueObjectError(`<${this.value}> is not a Date value`, this.value, this.constructor.name)
        }
    }

    public static isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }
}
