import { CancellationDetails } from '@/modules/Subscription/Shared/CancellationDetails';
import { Discount } from '@/modules/Subscription/Shared/Discount';
import { TaxRate } from '@/modules/Subscription/Shared/TaxRate';
import type { Stripe } from 'stripe';

interface AdaptedSubscription {
  id: string;
  customer: string;
  applicationFeePercent?: number;
  status: string;
  product: string;
  price?: number;
  currency: string;
  nickname?: string;
  taxBehavior?: string;
  created: number;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  billingCycleAnchor: number;
  collectionMethod: string;
  cancelAt?: number;
  cancelAtPeriodEnd: boolean;
  canceledAt?: number;
  cancellationDetails: CancellationDetails;
  endedAt?: number;
  daysUntilDue?: number;
  defaultPaymentMethod?: string;
  defaultTaxRates?: TaxRate[];
  discount?: Discount;
  latestInvoice?: string;
}

// eslint-disable-next-line
export const createSubscriptionAdapter = (subscription: Stripe.Subscription): AdaptedSubscription => ({
  id: subscription.id,
  applicationFeePercent: subscription.application_fee_percent ?? undefined,
  customer: subscription.customer.toString(),
  status: subscription.status,
  created: subscription.created,
  product: subscription.items.data[0].price.product.toString(),
  price: subscription.items.data[0].price.unit_amount ?? undefined,
  currency: subscription.currency,
  nickname: subscription.items.data[0].price.nickname ?? undefined,
  taxBehavior: subscription.items.data[0].price.tax_behavior ?? undefined,
  currentPeriodStart: subscription.current_period_start,
  currentPeriodEnd: subscription.current_period_end,
  endedAt: subscription.ended_at ?? undefined,
  billingCycleAnchor: subscription.billing_cycle_anchor,
  cancelAt: subscription.cancel_at ?? undefined,
  cancelAtPeriodEnd: subscription.cancel_at_period_end,
  canceledAt: subscription.canceled_at ?? undefined,
  cancellationDetails: {
    comment: subscription.cancellation_details?.comment ?? undefined,
    feedback: subscription.cancellation_details?.feedback ?? undefined,
    reason: subscription.cancellation_details?.reason ?? undefined,
  },
  daysUntilDue: subscription.days_until_due ?? undefined,
  defaultPaymentMethod: subscription.default_payment_method?.toString(),
  collectionMethod: subscription.collection_method,
  defaultTaxRates: subscription.default_tax_rates?.map((taxRate: Stripe.TaxRate) => ({
    active: taxRate.active,
    country: taxRate.country ?? undefined,
    state: taxRate.state ?? undefined,
    jurisdiction: taxRate.jurisdiction ?? undefined,
    effectivePercentage: taxRate.effective_percentage ?? undefined,
    percentage: taxRate.percentage,
    descrption: taxRate.description ?? undefined,
  })),
  discount: {
    id: subscription.discount?.id,
    promotionCode: subscription.discount?.promotion_code?.toString(),
    amountOff: subscription.discount?.coupon?.amount_off ?? undefined,
  },
  latestInvoice: subscription.latest_invoice?.toString(),
});
