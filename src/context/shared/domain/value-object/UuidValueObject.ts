import { v4 as uuid } from "uuid"
import validate from "uuid-validate"
import ValueObject from "./ValueObject"
import ValueObjectError from "../error/ValueObjectError"

export default class UuidValueObject extends ValueObject<string> {
    protected valueIsDefined(): void {
        super.valueIsDefined()
        if (!validate(this.value)) {
            throw new ValueObjectError(`<${this.value}> is not a valid uuid`, this.value, this.constructor.name)
        }
    }

    public static random(): UuidValueObject {
        return new UuidValueObject(uuid())
    }
}
