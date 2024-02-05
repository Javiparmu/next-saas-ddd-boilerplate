import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoicePdf extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidPdf(value);
  }

  assertIsValidPdf(value: string): void {
    if (!value.startsWith('https://pay.stripe.com/invoice/')) {
      throw new Error('Invalid invoice pdf');
    }
  }
}
