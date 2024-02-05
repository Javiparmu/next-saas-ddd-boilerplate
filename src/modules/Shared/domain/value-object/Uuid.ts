import validate from 'uuid-validate';
import { ValueObject } from './ValueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    this.assertIsValidUuid(value);
  }

  assertIsValidUuid(value: string): void {
    if (!validate(value)) {
      throw new Error('Invalid UUID');
    }
  }

  toString(): string {
    return this.value;
  }
}
