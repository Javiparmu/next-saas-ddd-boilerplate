import { UserId } from './value-object/UserId';
import { AggregateRoot } from '@/modules/Shared/domain/AggregateRoot';
import { StripeCurrentPeriodEnd } from './value-object/stripe/StripeCurrentPeriodEnd';
import { Primitives } from '@/modules/Shared/domain/Primitives';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { StripePriceId } from './value-object/stripe/StripePriceid';

// REPLACE with your domain logic
export class UserSubscription extends AggregateRoot {
  readonly id: SubscriptionId;
  readonly userId?: UserId;
  readonly stripeCurrentPeriodEnd: StripeCurrentPeriodEnd;
  readonly stripePriceId?: StripePriceId;

  constructor({
    id,
    userId,
    stripeCurrentPeriodEnd,
    stripePriceId,
  }: {
    id: SubscriptionId;
    userId?: UserId;
    stripeCurrentPeriodEnd: StripeCurrentPeriodEnd;
    stripePriceId?: StripePriceId;
  }) {
    super();
    this.id = id;
    this.userId = userId;
    this.stripeCurrentPeriodEnd = stripeCurrentPeriodEnd;
    this.stripePriceId = stripePriceId;
  }

  static fromPrimitives({
    id,
    userId,
    stripeCurrentPeriodEnd,
    stripePriceId,
  }: Primitives<UserSubscription>): UserSubscription {
    return new UserSubscription({
      id: new SubscriptionId(id),
      userId: new UserId(userId!),
      stripeCurrentPeriodEnd: new StripeCurrentPeriodEnd(stripeCurrentPeriodEnd),
      stripePriceId: new StripePriceId(stripePriceId!),
    });
  }

  toPrimitives(): Primitives<UserSubscription> {
    return {
      id: this.id.value,
      userId: this.userId?.value,
      stripeCurrentPeriodEnd: this.stripeCurrentPeriodEnd.value,
      stripePriceId: this.stripePriceId?.value,
    };
  }
}
