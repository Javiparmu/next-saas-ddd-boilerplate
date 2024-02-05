import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { UserId } from '@/modules/User/domain/value-object/UserId';
import { StripeCurrentPeriodEnd } from '@/modules/User/domain/value-object/stripe/StripeCurrentPeriodEnd';
import { StripePriceId } from '@/modules/User/domain/value-object/stripe/StripePriceid';
import { Schema, model, models } from 'mongoose';

const userSubscriptionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (stripeSubscriptionId: string) => new SubscriptionId(stripeSubscriptionId),
      set: (stripeSubscriptionId: SubscriptionId) => stripeSubscriptionId.value,
    },
    userId: {
      type: String,
      required: true,
      get: (userId: string) => new UserId(userId),
      set: (userId: UserId) => userId.value,
    },
    stripeCurrentPeriodEnd: {
      type: Number,
      required: true,
      get: (stripeCurrentPeriodEnd: number) => new StripeCurrentPeriodEnd(stripeCurrentPeriodEnd),
      set: (stripeCurrentPeriodEnd: StripeCurrentPeriodEnd) => stripeCurrentPeriodEnd.value,
    },
    stripePriceId: {
      type: String,
      required: true,
      get: (stripePriceId: string) => new StripePriceId(stripePriceId),
      set: (stripePriceId: StripePriceId) => stripePriceId.value,
    },
  },
  {
    timestamps: true,
    collection: 'userSubscriptions',
  },
);

export default models?.UserSubscription || model('UserSubscription', userSubscriptionSchema);
