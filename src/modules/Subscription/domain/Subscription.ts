import { Primitives } from '@/modules/Shared/domain/Primitives';
import { SubscriptionId } from './value-object/SubscriptionId';
import { AggregateRoot } from '@/modules/Shared/domain/AggregateRoot';
import { SubscriptionPrice } from './value-object/SubscriptionPrice';
import { SubscriptionApplicationFeePercent } from './value-object/SubscriptionApplicationFeePercent';
import { SubscriptionCurrency } from './value-object/SubscriptionCurrency';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { SubscriptionBillingCycleAnchor } from './value-object/SubscriptionBillingCycleAnchor';
import { SubscriptionCollectionMethod } from './value-object/SubscriptionCollectionMethod';
import { SubscriptionDaysUntilDue } from './value-object/SubscriptionDaysUntilDue';
import { SubscriptionDefaultPaymentMethod } from './value-object/SubscriptionDefaultPaymentMethod';
import { SubscriptionDefaultTaxRate } from './value-object/SubcriptionDefaultTaxRate';
import { SubscriptionDiscount } from './value-object/SubscriptionDiscount';
import { SubscriptionLatestInvoice } from './value-object/SubscriptionLatestInvoice';
import { SubscriptionCustomer } from './value-object/SubscriptionCustomer';
import { SubscriptionStatus } from './value-object/SubscriptionStatus';
import { SubscriptionProduct } from './value-object/SubscriptionProduct';
import { SubscriptionNickname } from './value-object/SubscriptionNickname';
import { SubscriptionTaxBehaviour } from './value-object/SubscriptionTaxBehaviour';
import { SubscriptionCancellationDetails } from './value-object/SubscriptionCancellationDetails';

export class Subscription extends AggregateRoot {
  readonly id: SubscriptionId;
  readonly customer?: SubscriptionCustomer;
  readonly applicationFeePercent?: SubscriptionApplicationFeePercent;
  readonly status: SubscriptionStatus;
  readonly product?: SubscriptionProduct;
  readonly price?: SubscriptionPrice;
  readonly currency?: SubscriptionCurrency;
  readonly nickname?: SubscriptionNickname;
  readonly taxBehavior?: SubscriptionTaxBehaviour;
  readonly created?: UnixDate;
  readonly currentPeriodStart?: UnixDate;
  readonly currentPeriodEnd?: UnixDate;
  readonly billingCycleAnchor?: SubscriptionBillingCycleAnchor;
  readonly collectionMethod?: SubscriptionCollectionMethod;
  readonly cancelAt?: UnixDate;
  readonly cancelAtPeriodEnd?: boolean;
  readonly canceledAt?: UnixDate;
  readonly cancellationDetails?: SubscriptionCancellationDetails;
  readonly endedAt?: UnixDate;
  readonly daysUntilDue?: SubscriptionDaysUntilDue;
  readonly defaultPaymentMethod?: SubscriptionDefaultPaymentMethod;
  readonly defaultTaxRates?: SubscriptionDefaultTaxRate[];
  readonly discount?: SubscriptionDiscount;
  readonly latestInvoice?: SubscriptionLatestInvoice;

  constructor({
    id,
    customer,
    applicationFeePercent,
    status,
    product,
    price,
    currency,
    nickname,
    taxBehavior,
    created,
    currentPeriodStart,
    currentPeriodEnd,
    billingCycleAnchor,
    collectionMethod,
    cancelAt,
    cancelAtPeriodEnd,
    canceledAt,
    cancellationDetails,
    endedAt,
    daysUntilDue,
    defaultPaymentMethod,
    defaultTaxRates,
    discount,
    latestInvoice,
  }: {
    id: SubscriptionId;
    customer?: SubscriptionCustomer;
    applicationFeePercent?: SubscriptionApplicationFeePercent;
    product?: SubscriptionProduct;
    price?: SubscriptionPrice;
    nickname?: SubscriptionNickname;
    taxBehavior?: SubscriptionTaxBehaviour;
    status: SubscriptionStatus;
    currency?: SubscriptionCurrency;
    created?: UnixDate;
    currentPeriodStart?: UnixDate;
    currentPeriodEnd?: UnixDate;
    billingCycleAnchor?: SubscriptionBillingCycleAnchor;
    collectionMethod?: SubscriptionCollectionMethod;
    cancelAt?: UnixDate;
    cancelAtPeriodEnd?: boolean;
    canceledAt?: UnixDate;
    cancellationDetails?: SubscriptionCancellationDetails;
    endedAt?: UnixDate;
    daysUntilDue?: SubscriptionDaysUntilDue;
    defaultPaymentMethod?: SubscriptionDefaultPaymentMethod;
    defaultTaxRates?: SubscriptionDefaultTaxRate[];
    discount?: SubscriptionDiscount;
    latestInvoice?: SubscriptionLatestInvoice;
  }) {
    super();
    this.id = id;
    this.customer = customer;
    this.applicationFeePercent = applicationFeePercent;
    this.status = status;
    this.product = product;
    this.price = price;
    this.currency = currency;
    this.nickname = nickname;
    this.taxBehavior = taxBehavior;
    this.created = created;
    this.currentPeriodStart = currentPeriodStart;
    this.currentPeriodEnd = currentPeriodEnd;
    this.billingCycleAnchor = billingCycleAnchor;
    this.collectionMethod = collectionMethod;
    this.cancelAt = cancelAt;
    this.cancelAtPeriodEnd = cancelAtPeriodEnd;
    this.canceledAt = canceledAt;
    this.cancellationDetails = cancellationDetails;
    this.endedAt = endedAt;
    this.daysUntilDue = daysUntilDue;
    this.defaultPaymentMethod = defaultPaymentMethod;
    this.defaultTaxRates = defaultTaxRates;
    this.discount = discount;
    this.latestInvoice = latestInvoice;
  }

  static fromPrimitives({
    id,
    customer,
    applicationFeePercent,
    status,
    currency,
    product,
    price,
    nickname,
    taxBehavior,
    created,
    currentPeriodStart,
    currentPeriodEnd,
    billingCycleAnchor,
    collectionMethod,
    cancelAt,
    cancelAtPeriodEnd,
    canceledAt,
    cancellationDetails,
    endedAt,
    daysUntilDue,
    defaultPaymentMethod,
    defaultTaxRates,
    discount,
    latestInvoice,
  }: Primitives<Subscription>): Subscription {
    return new Subscription({
      id: new SubscriptionId(id),
      customer: new SubscriptionCustomer(customer!),
      applicationFeePercent: new SubscriptionApplicationFeePercent(applicationFeePercent!),
      status: new SubscriptionStatus(status!),
      product: new SubscriptionProduct(product!),
      price: new SubscriptionPrice(price!),
      currency: new SubscriptionCurrency(currency!),
      nickname: new SubscriptionNickname(nickname!),
      taxBehavior: new SubscriptionTaxBehaviour(taxBehavior!),
      created: new UnixDate(created!),
      currentPeriodStart: new UnixDate(currentPeriodStart!),
      currentPeriodEnd: new UnixDate(currentPeriodEnd!),
      billingCycleAnchor: new SubscriptionBillingCycleAnchor(billingCycleAnchor!),
      collectionMethod: new SubscriptionCollectionMethod(collectionMethod!),
      cancelAt: new UnixDate(cancelAt!),
      cancelAtPeriodEnd: cancelAtPeriodEnd!,
      canceledAt: new UnixDate(canceledAt!),
      cancellationDetails: new SubscriptionCancellationDetails(cancellationDetails!),
      endedAt: new UnixDate(endedAt!),
      daysUntilDue: new SubscriptionDaysUntilDue(daysUntilDue!),
      defaultPaymentMethod: new SubscriptionDefaultPaymentMethod(defaultPaymentMethod!),
      defaultTaxRates: defaultTaxRates!.map((taxRate) => new SubscriptionDefaultTaxRate(taxRate)),
      discount: new SubscriptionDiscount(discount!),
      latestInvoice: new SubscriptionLatestInvoice(latestInvoice!),
    });
  }

  toPrimitives(): Primitives<Subscription> {
    return {
      id: this.id.value,
      customer: this.customer?.value,
      applicationFeePercent: this.applicationFeePercent?.value,
      status: this.status?.value,
      product: this.product?.value,
      price: this.price?.value,
      currency: this.currency?.value,
      nickname: this.nickname?.value,
      taxBehavior: this.taxBehavior?.value,
      created: this.created?.value,
      currentPeriodStart: this.currentPeriodStart?.value,
      currentPeriodEnd: this.currentPeriodEnd?.value,
      billingCycleAnchor: this.billingCycleAnchor?.value,
      collectionMethod: this.collectionMethod?.value,
      cancelAt: this.cancelAt?.value,
      cancelAtPeriodEnd: this.cancelAtPeriodEnd,
      canceledAt: this.canceledAt?.value,
      cancellationDetails: this.cancellationDetails?.value,
      endedAt: this.endedAt?.value,
      daysUntilDue: this.daysUntilDue?.value,
      defaultPaymentMethod: this.defaultPaymentMethod?.value,
      defaultTaxRates: this.defaultTaxRates?.map((taxRate) => taxRate.value),
      discount: this.discount?.value,
      latestInvoice: this.latestInvoice?.value,
    };
  }
}
