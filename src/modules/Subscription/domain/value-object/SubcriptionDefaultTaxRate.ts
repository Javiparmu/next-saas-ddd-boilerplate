import { TaxRate } from '../../Shared/TaxRate';

export class SubscriptionDefaultTaxRate {
  readonly value: TaxRate;

  constructor(value: TaxRate) {
    this.value = value;
  }
}
