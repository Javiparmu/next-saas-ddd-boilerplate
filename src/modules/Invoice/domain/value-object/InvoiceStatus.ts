import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceStatus extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidStatus(value);
  }

  assertIsValidStatus(value: string): void {
    if (!['draft', 'open', 'paid', 'uncollectible', 'void'].includes(value)) {
      throw new Error('Invalid invoice status');
    }
  }
}
