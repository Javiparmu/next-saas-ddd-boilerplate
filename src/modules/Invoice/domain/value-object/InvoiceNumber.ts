import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceNumber extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidNumber(value);
  }

  assertIsValidNumber(value: string): void {
    if (!value.includes('-')) {
      throw new Error('Invalid invoice number');
    }

    const [number1, number2] = value.split('-');

    if (number1.length !== 8 || number2.length !== 4) {
      throw new Error('Invalid invoice number');
    }
  }
}
