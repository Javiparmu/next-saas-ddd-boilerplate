import { NumberValueObject } from '@/modules/Shared/domain/value-object/NumberValueObject';

export class SubscriptionPrice extends NumberValueObject {
  constructor(value: number) {
    super(value);

    this.assertIsValidPrice();
  }

  assertIsValidPrice(): void {
    if (this.value < 0) {
      throw new Error('Price is required');
    }
  }
}
