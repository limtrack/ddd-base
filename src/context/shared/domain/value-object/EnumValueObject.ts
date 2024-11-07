import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class EnumValueObject<T extends string | number> extends ValueObject<T> {
    constructor(
        value: T,
    public readonly validValues: T[]
    ) {
        super(value)
        this.validValues = validValues;
        this.valueIsInValidValues()
    }

    public valueIsInValidValues(): void {
        if (!this.validValues.includes(this.value)) {
            throw new ValueObjectError(
                `The <${this.value.toString()}> is not included in the <validValues> of ${this.constructor.name}`,
                this.value,
                this.constructor.name
            )
        }
    }
}
