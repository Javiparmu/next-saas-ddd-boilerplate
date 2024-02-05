import { NumberValueObject } from './NumberValueObject';

export class UnixDate extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  assertIsValidUnixDate(): void {
    if (this.value < 0) {
      throw new Error(`The unix date <${this.value}> is invalid`);
    }
  }
}
