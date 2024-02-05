import type { Stripe } from 'stripe';

interface SubscriptionDeletedAdapted {
  id: string;
  cancelAt?: number;
  cancelAtPeriodEnd: boolean;
  canceledAt?: number;
  cancellationDetails: {
    comment?: string;
    feedback?: string;
    reason?: string;
  };
  endedAt?: number;
}

// eslint-disable-next-line
export const createSubscriptionDeletedAdapter = (subscriptionDeleted: Stripe.Subscription): SubscriptionDeletedAdapted => ({
  id: subscriptionDeleted.id,
  cancelAt: subscriptionDeleted.cancel_at ?? undefined,
  cancelAtPeriodEnd: subscriptionDeleted.cancel_at_period_end,
  canceledAt: subscriptionDeleted.canceled_at ?? undefined,
  cancellationDetails: {
    comment: subscriptionDeleted.cancellation_details?.comment ?? undefined,
    feedback: subscriptionDeleted.cancellation_details?.feedback ?? undefined,
    reason: subscriptionDeleted.cancellation_details?.reason ?? undefined,
  },
  endedAt: subscriptionDeleted.ended_at ?? undefined,
});
