import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class StringValueObject extends ValueObject<string> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (typeof this.value !== "string") {
            throw new ValueObjectError(`<${this.value}> is not a string value`, this.value, this.constructor.name)
        }
    }
}
