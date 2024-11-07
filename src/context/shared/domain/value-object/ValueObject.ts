import { isNil } from "lodash"
import ValueObjectError from "../error/ValueObjectError"

export type Primitives = string | number | boolean | Date

export default abstract class ValueObject<T extends Primitives | object> {
    readonly value: T

    constructor(value: T) {
        this.value = value
        this.valueIsDefined()
    }

    protected valueIsDefined(): void {
        if (isNil(this.value)) {
            throw new ValueObjectError(`The <value> of ${this.constructor.name} must be defined`, this.value, this.constructor.name)
        }
    }

    equals(other: ValueObject<T>): boolean {
        if (other.constructor.name !== this.constructor.name) return false

        if (typeof this.value === "string" || typeof this.value === "number" || typeof this.value === "boolean") {
            return other.value === this.value
        } else if (this.value instanceof Date && other.value instanceof Date) {
            return other.value.getTime() === this.value.getTime()
        }

        return JSON.stringify(other.value) === JSON.stringify(this.value)
    }

    toString(): string {
        if (typeof this.value === "string" || typeof this.value === "number" || typeof this.value === "boolean") {
            return this.value.toString()
        } else if (this.value instanceof Date) {
            return this.value.toISOString()
        } else {
            return JSON.stringify(this.value)
        }
    }
}
