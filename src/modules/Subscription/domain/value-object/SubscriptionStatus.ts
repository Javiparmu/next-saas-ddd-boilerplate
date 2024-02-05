import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class SubscriptionStatus extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidStatus(value);
  }

  assertIsValidStatus(status: string): void {
    const validStatus = ['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'];
    if (!validStatus.includes(status)) {
      throw new Error('Invalid status');
    }
  }
}
