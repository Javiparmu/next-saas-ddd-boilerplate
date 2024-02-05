import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceHostedUrl extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidHostedUrl(value);
  }

  assertIsValidHostedUrl(value: string): void {
    if (!value.startsWith('https://invoice.stripe.com/i/')) {
      throw new Error('Invalid invoice hosted url');
    }
  }
}
