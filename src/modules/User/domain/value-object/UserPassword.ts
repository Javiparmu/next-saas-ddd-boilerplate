import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidPassword(value);
  }

  private assertIsValidPassword(value: string): void {
    if (value.length < 8) {
      throw new Error('Invalid password, must be min 8 characters');
    }
  }
}
