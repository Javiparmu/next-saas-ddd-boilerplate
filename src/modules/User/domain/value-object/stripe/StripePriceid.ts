import { StringValueObject } from '@/modules/Shared/domain/value-object/StringValueObject';

export class StripePriceId extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.assertIsValidStripePriceId(value);
  }

  assertIsValidStripePriceId(value: string): void {
    if (!value.match(/price_\w{14}/)) {
      throw new Error('Invalid stripe price id');
    }
  }
}
