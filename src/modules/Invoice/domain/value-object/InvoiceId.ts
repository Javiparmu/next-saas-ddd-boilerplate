import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceId extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidId(value);
  }

  assertIsValidId(value: string): void {
    if (!value.startsWith('in_')) {
      throw new Error('Invalid invoice id');
    }
  }
}
