import { CancellationDetails } from '../../Shared/CancellationDetails';

export class SubscriptionCancellationDetails {
  readonly value: CancellationDetails;

  constructor(value: CancellationDetails) {
    this.value = value;
  }
}
