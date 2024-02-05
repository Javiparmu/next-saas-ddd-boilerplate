import { Discount } from '../../Shared/Discount';

export class SubscriptionDiscount {
  readonly value: Discount;

  constructor(value: Discount) {
    this.value = value;
  }
}
