import { NumberValueObject } from '@/modules/Shared/domain/value-object/NumberValueObject';

export class StripeCurrentPeriodEnd extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }

  assertIsValidStripeCurrentPeriodEnd(value: number): void {
    if (!value) {
      throw new Error('Invalid stripe current period end');
    }
  }
}
