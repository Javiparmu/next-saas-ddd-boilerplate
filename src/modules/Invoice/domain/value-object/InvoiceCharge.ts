import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceCharge extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidCharge(value);
  }

  assertIsValidCharge(value: string): void {
    if (!value.startsWith('ch_')) {
      throw new Error('Invalid invoice charge');
    }
  }
}
