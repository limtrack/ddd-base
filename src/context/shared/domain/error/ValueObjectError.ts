export default class ValueObjectError<T> extends Error {
    public readonly name: string;
    public readonly type: string;
    public readonly value: T;
  
    constructor(message: string, value: T, type: string) {
      super(message);
      this.name = this.constructor.name;
      this.type = type;
      this.value = value;
  
      Object.setPrototypeOf(this, new.target.prototype);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }