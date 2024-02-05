import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class SubscriptionTaxBehaviour extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidTaxBehaviour();
  }

  assertIsValidTaxBehaviour(): void {
    if (this.value && !['unspecified', 'inclusive', 'exclusive'].includes(this.value)) {
      throw new Error('Invalid tax behaviour');
    }
  }
}
