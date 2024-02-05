import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { CancellationDetails } from '@/modules/Subscription/Shared/CancellationDetails';
import { Discount } from '@/modules/Subscription/Shared/Discount';
import { TaxRate } from '@/modules/Subscription/Shared/TaxRate';
import { SubscriptionDefaultTaxRate } from '@/modules/Subscription/domain/value-object/SubcriptionDefaultTaxRate';
import { SubscriptionApplicationFeePercent } from '@/modules/Subscription/domain/value-object/SubscriptionApplicationFeePercent';
import { SubscriptionBillingCycleAnchor } from '@/modules/Subscription/domain/value-object/SubscriptionBillingCycleAnchor';
import { SubscriptionCancellationDetails } from '@/modules/Subscription/domain/value-object/SubscriptionCancellationDetails';
import { SubscriptionCollectionMethod } from '@/modules/Subscription/domain/value-object/SubscriptionCollectionMethod';
import { SubscriptionCurrency } from '@/modules/Subscription/domain/value-object/SubscriptionCurrency';
import { SubscriptionCustomer } from '@/modules/Subscription/domain/value-object/SubscriptionCustomer';
import { SubscriptionDaysUntilDue } from '@/modules/Subscription/domain/value-object/SubscriptionDaysUntilDue';
import { SubscriptionDefaultPaymentMethod } from '@/modules/Subscription/domain/value-object/SubscriptionDefaultPaymentMethod';
import { SubscriptionDiscount } from '@/modules/Subscription/domain/value-object/SubscriptionDiscount';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { SubscriptionLatestInvoice } from '@/modules/Subscription/domain/value-object/SubscriptionLatestInvoice';
import { SubscriptionNickname } from '@/modules/Subscription/domain/value-object/SubscriptionNickname';
import { SubscriptionPrice } from '@/modules/Subscription/domain/value-object/SubscriptionPrice';
import { SubscriptionProduct } from '@/modules/Subscription/domain/value-object/SubscriptionProduct';
import { SubscriptionStatus } from '@/modules/Subscription/domain/value-object/SubscriptionStatus';
import { SubscriptionTaxBehaviour } from '@/modules/Subscription/domain/value-object/SubscriptionTaxBehaviour';
import { Schema, model, models } from 'mongoose';

const defaultSchemaConfig = {
  _id: false,
  id: false,
  timestamps: false,
};

const defaultTaxRateSchema = new Schema(
  {
    active: Boolean,
    country: String,
    state: String,
    jurisdiction: String,
    effectivePercentage: Number,
    percentage: Number,
    descrption: String,
  },
  defaultSchemaConfig,
);

const subscriptionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (id: string) => new SubscriptionId(id),
      set: (id: SubscriptionId) => id.value,
    },
    customer: {
      type: String,
      required: true,
      get: (customer: string) => new SubscriptionCustomer(customer),
      set: (customer: SubscriptionCustomer) => customer?.value,
    },
    applicationFeePercent: {
      type: Number,
      get: (feePercent: number) => new SubscriptionApplicationFeePercent(feePercent),
      set: (feePercent: SubscriptionApplicationFeePercent) => feePercent?.value,
    },
    status: {
      type: String,
      enum: ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid'],
      get: (status: string) => new SubscriptionStatus(status),
      set: (status: SubscriptionStatus) => status?.value,
    },
    created: {
      type: Number,
      get: (created: number) => new UnixDate(created),
      set: (created: UnixDate) => created?.value,
    },
    product: {
      type: String,
      get: (product: string) => new SubscriptionProduct(product),
      set: (product: SubscriptionProduct) => product?.value,
    },
    price: {
      type: Number,
      get: (price: number) => new SubscriptionPrice(price),
      set: (price: SubscriptionPrice) => price?.value / 100,
    },
    currency: {
      type: String,
      get: (currency: string) => new SubscriptionCurrency(currency),
      set: (currency: SubscriptionCurrency) => currency?.value,
    },
    nickname: {
      type: String,
      get: (nickname: string) => new SubscriptionNickname(nickname),
      set: (nickname: SubscriptionNickname) => nickname?.value,
    },
    taxBehavior: {
      type: String,
      enum: ['exclusive', 'inclusive', 'unspecified'],
      get: (taxBehavior: string) => new SubscriptionTaxBehaviour(taxBehavior),
      set: (taxBehavior: SubscriptionTaxBehaviour) => taxBehavior?.value,
    },
    currentPeriodStart: {
      type: Number,
      get: (start: number) => new UnixDate(start),
      set: (start: UnixDate) => start?.value,
    },
    currentPeriodEnd: {
      type: Number,
      get: (end: number) => new UnixDate(end),
      set: (end: UnixDate) => end?.value,
    },
    billingCycleAnchor: {
      type: Number,
      get: (date: number) => new SubscriptionBillingCycleAnchor(date),
      set: (date: SubscriptionBillingCycleAnchor) => date?.value,
    },
    endedAt: {
      type: Number,
      get: (ended: number) => new UnixDate(ended),
      set: (ended: UnixDate) => ended?.value,
    },
    cancelAt: {
      type: Number,
      get: (date: number) => new UnixDate(date),
      set: (date: UnixDate) => date?.value,
    },
    cancelAtPeriodEnd: Boolean,
    canceledAt: {
      type: Number,
      get: (canceled: number) => new UnixDate(canceled),
      set: (canceled: UnixDate) => canceled?.value,
    },
    cancellationDetails: {
      type: Object,
      get: (details: CancellationDetails) => new SubscriptionCancellationDetails(details),
      set: (details: SubscriptionCancellationDetails) => details?.value,
    },
    collectionMethod: {
      type: String,
      enum: ['charge_automatically', 'send_invoice'],
      get: (method: string) => new SubscriptionCollectionMethod(method),
      set: (method: SubscriptionCollectionMethod) => method?.value,
    },
    daysUntilDue: {
      type: Number,
      get: (days: number) => new SubscriptionDaysUntilDue(days),
      set: (days: SubscriptionDaysUntilDue) => days?.value,
    },
    defaultPaymentMethod: {
      type: String,
      get: (method: string) => new SubscriptionDefaultPaymentMethod(method),
      set: (method: SubscriptionDefaultPaymentMethod) => method?.value,
    },
    defaultTaxRates: {
      type: [defaultTaxRateSchema],
      get: (rates: TaxRate[]) => rates.map((r) => new SubscriptionDefaultTaxRate(r)),
      set: (rates: SubscriptionDefaultTaxRate[]) => rates?.map((r) => r.value),
    },
    discount: {
      type: Object,
      get: (discount: Discount) => new SubscriptionDiscount(discount),
      set: (discount: SubscriptionDiscount) => discount?.value,
    },
    latestInvoice: {
      type: String,
      get: (invoice: string) => new SubscriptionLatestInvoice(invoice),
      set: (invoice: SubscriptionLatestInvoice) => invoice?.value,
    },
  },
  {
    timestamps: false,
    collection: 'subscriptions',
  },
);

export default models?.Subscription || model('Subscription', subscriptionSchema);
