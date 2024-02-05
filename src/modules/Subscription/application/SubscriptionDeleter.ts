import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { CancellationDetails } from '../Shared/CancellationDetails';
import { Subscription } from '../domain/Subscription';
import { SubscriptionRepository } from '../domain/SubscriptionRepository';
import { SubscriptionId } from '../domain/value-object/SubscriptionId';
import { SubscriptionStatus } from '../domain/value-object/SubscriptionStatus';
import { SubscriptionCancellationDetails } from '../domain/value-object/SubscriptionCancellationDetails';

export class SubscriptionDeleter {
  private repository: SubscriptionRepository;

  constructor(repository: SubscriptionRepository) {
    this.repository = repository;
  }

  async run({
    id,
    cancelAt,
    cancelAtPeriodEnd,
    canceledAt,
    cancellationDetails,
    endedAt,
  }: {
    id: string;
    cancelAt?: number;
    cancelAtPeriodEnd: boolean;
    canceledAt?: number;
    cancellationDetails: CancellationDetails;
    endedAt?: number;
  }): Promise<void> {
    const updateSubscription = new Subscription({
      id: new SubscriptionId(id),
      status: new SubscriptionStatus('canceled'),
      cancelAt: cancelAt ? new UnixDate(cancelAt) : undefined,
      cancelAtPeriodEnd,
      canceledAt: canceledAt ? new UnixDate(canceledAt) : undefined,
      cancellationDetails: new SubscriptionCancellationDetails(cancellationDetails),
      endedAt: endedAt ? new UnixDate(endedAt) : undefined,
    });

    await this.repository.save(updateSubscription);
  }
}
