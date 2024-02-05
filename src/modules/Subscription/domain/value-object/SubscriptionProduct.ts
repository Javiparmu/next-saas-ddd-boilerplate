import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class SubscriptionProduct extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidProduct();
  }

  assertIsValidProduct(): void {
    if (this.value && !this.value.includes('prod_')) {
      throw new Error('Product is required');
    }
  }
}
