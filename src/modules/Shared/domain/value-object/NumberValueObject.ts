import { ValueObject } from './ValueObject';

export class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  toString(): string {
    return this.value.toString();
  }
}
