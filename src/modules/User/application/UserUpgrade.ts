import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { UserRepository } from '../domain/UserRepository';
import { UserSubscription } from '../domain/UserSubscription';
import { UserId } from '../domain/value-object/UserId';
import { StripeCurrentPeriodEnd } from '../domain/value-object/stripe/StripeCurrentPeriodEnd';
import { StripePriceId } from '../domain/value-object/stripe/StripePriceid';

export class UserUpgrade {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(document: {
    id: string;
    userId: string;
    stripeCurrentPeriodEnd: number;
    stripePriceId: string;
    requestCount: number;
    requestLimit: number;
    requestReset: number;
  }): Promise<void> {
    const userSubscription = new UserSubscription({
      id: new SubscriptionId(document.id),
      userId: new UserId(document.userId),
      stripeCurrentPeriodEnd: new StripeCurrentPeriodEnd(document.stripeCurrentPeriodEnd),
      stripePriceId: new StripePriceId(document.stripePriceId),
    });

    await this.repository.subscribe(userSubscription);
  }
}
