import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class NumberValueObject extends ValueObject<number> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (typeof this.value !== "number") {
            throw new ValueObjectError(`<${this.value}> is not a number value`, this.value, this.constructor.name)
        }
    }
}
