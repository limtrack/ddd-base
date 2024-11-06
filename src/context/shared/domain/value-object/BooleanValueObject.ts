import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class BooleanValueObject extends ValueObject<boolean> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (typeof this.value !== "boolean") {
          throw new ValueObjectError(`<${this.value}> is not a boolean value`, this.value, this.constructor.name)
        }
    }
}
