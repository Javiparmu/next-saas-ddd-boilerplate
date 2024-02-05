import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class Email extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidEmail(value);
  }

  private assertIsValidEmail(value: string): void {
    if (!value.includes('@')) {
      throw new Error('Invalid email');
    }
  }
}
