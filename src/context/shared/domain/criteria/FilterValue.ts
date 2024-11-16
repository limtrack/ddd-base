import ValueObject from "../value-object/ValueObject";
import ValueObjectError from "../error/ValueObjectError";


export default class FilterValue extends ValueObject<string | number> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (typeof this.value !== "string" && typeof this.value !== "number") {
            throw new ValueObjectError(`<${this.value}> is not a valid value`, this.value, this.constructor.name)
        }
    }
}