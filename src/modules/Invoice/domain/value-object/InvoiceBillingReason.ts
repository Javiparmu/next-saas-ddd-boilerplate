import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class InvoiceBillingReason extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidBillingReason(value);
  }

  assertIsValidBillingReason(value: string): void {
    if (
      ![
        'subscription_create',
        'subscription_cycle',
        'subscription_threshold',
        'subscription_update',
        'subscription',
        'manual',
        'upcoming',
      ].includes(value)
    ) {
      throw new Error('Invalid invoice billing reason');
    }
  }
}
