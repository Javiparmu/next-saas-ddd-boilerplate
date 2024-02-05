import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { UserSubscription } from '../domain/UserSubscription';
import { UserSubscriptionRepository } from '../domain/UserSubscriptionRepository';
import { UserId } from '../domain/value-object/UserId';
import { UserRequestCount } from '../domain/value-object/UserRequestCount';
import { UserRequestLimit } from '../domain/value-object/UserRequestLimit';
import { UserRequestReset } from '../domain/value-object/UserRequestReset';
import { StripeCurrentPeriodEnd } from '../domain/value-object/stripe/StripeCurrentPeriodEnd';
import { StripePriceId } from '../domain/value-object/stripe/StripePriceid';

export class UserSubscriptionCreator {
  private repository: UserSubscriptionRepository;

  constructor(repository: UserSubscriptionRepository) {
    this.repository = repository;
  }

  async run(document: {
    id: string;
    userId?: string;
    stripeCurrentPeriodEnd: number;
    stripePriceId?: string;
    requestCount?: number;
    requestLimit?: number;
    requestReset?: number;
  }): Promise<void> {
    const userSubscription = new UserSubscription({
      id: new SubscriptionId(document.id),
      userId: document.userId ? new UserId(document.userId) : undefined,
      stripeCurrentPeriodEnd: new StripeCurrentPeriodEnd(document.stripeCurrentPeriodEnd),
      stripePriceId: document.stripePriceId ? new StripePriceId(document.stripePriceId) : undefined,
      requestCount: document.requestCount ? new UserRequestCount(document.requestCount) : undefined,
      requestLimit: document.requestLimit ? new UserRequestLimit(document.requestLimit) : undefined,
      requestReset: document.requestReset ? new UserRequestReset(document.requestReset) : undefined,
    });

    await this.repository.save(userSubscription);
  }
}
