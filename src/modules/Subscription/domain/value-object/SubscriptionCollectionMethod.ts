import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class SubscriptionCollectionMethod extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidCollectionMethod();
  }

  assertIsValidCollectionMethod(): void {
    if (!['charge_automatically', 'send_invoice'].includes(this.value)) {
      throw new Error('Invalid collection method');
    }
  }
}
