import ValueObject from "./ValueObject"

export default abstract class AnyObjectValueObject<T extends object> extends ValueObject<T> {}
