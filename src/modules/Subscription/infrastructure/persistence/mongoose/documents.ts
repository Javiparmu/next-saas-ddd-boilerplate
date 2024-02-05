import { CancellationDetails } from '@/modules/Subscription/Shared/CancellationDetails';
import { Discount } from '@/modules/Subscription/Shared/Discount';
import { TaxRate } from '@/modules/Subscription/Shared/TaxRate';

export interface SubscriptionDocument {
  _id: string;
  customer: string;
  applicationFeePercent: number;
  status: string;
  product: string;
  price?: number;
  currency: string;
  nickname?: string;
  taxBehavior: string;
  created?: number;
  currentPeriodStart?: number;
  currentPeriodEnd?: number;
  billingCycleAnchor?: number;
  collectionMethod?: string;
  cancelAt?: number;
  cancelAtperiodEnd?: boolean;
  canceledAt?: number;
  cancellationDetails?: CancellationDetails;
  endedAt?: number;
  daysUntilDue?: number;
  defaultPaymentMethod?: string;
  defaultTaxRates?: TaxRate[];
  discount?: Discount;
  latestInvoice?: string;
}
