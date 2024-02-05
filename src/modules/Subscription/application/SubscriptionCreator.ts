import { SubscriptionRepository } from '../domain/SubscriptionRepository';
import { SubscriptionId } from '../domain/value-object/SubscriptionId';
import { Subscription } from '../domain/Subscription';
import { SubscriptionCustomer } from '../domain/value-object/SubscriptionCustomer';
import { SubscriptionPrice } from '../domain/value-object/SubscriptionPrice';
import { SubscriptionApplicationFeePercent } from '../domain/value-object/SubscriptionApplicationFeePercent';
import { SubscriptionCurrency } from '../domain/value-object/SubscriptionCurrency';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { SubscriptionCollectionMethod } from '../domain/value-object/SubscriptionCollectionMethod';
import { SubscriptionBillingCycleAnchor } from '../domain/value-object/SubscriptionBillingCycleAnchor';
import { SubscriptionDaysUntilDue } from '../domain/value-object/SubscriptionDaysUntilDue';
import { SubscriptionDefaultPaymentMethod } from '../domain/value-object/SubscriptionDefaultPaymentMethod';
import { SubscriptionDefaultTaxRate } from '../domain/value-object/SubcriptionDefaultTaxRate';
import { SubscriptionDiscount } from '../domain/value-object/SubscriptionDiscount';
import { SubscriptionLatestInvoice } from '../domain/value-object/SubscriptionLatestInvoice';
import { CancellationDetails } from '../Shared/CancellationDetails';
import { TaxRate } from '../Shared/TaxRate';
import { Discount } from '../Shared/Discount';
import { SubscriptionStatus } from '../domain/value-object/SubscriptionStatus';
import { SubscriptionProduct } from '../domain/value-object/SubscriptionProduct';
import { SubscriptionNickname } from '../domain/value-object/SubscriptionNickname';
import { SubscriptionTaxBehaviour } from '../domain/value-object/SubscriptionTaxBehaviour';
import { SubscriptionCancellationDetails } from '../domain/value-object/SubscriptionCancellationDetails';

export class SubscriptionCreator {
  private repository: SubscriptionRepository;

  constructor(repository: SubscriptionRepository) {
    this.repository = repository;
  }

  async run({
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
  }): Promise<void> {
    const subscription = new Subscription({
      id: new SubscriptionId(id),
      customer: new SubscriptionCustomer(customer),
      applicationFeePercent: applicationFeePercent ? new SubscriptionApplicationFeePercent(applicationFeePercent) : undefined,
      status: new SubscriptionStatus(status),
      product: new SubscriptionProduct(product),
      price: price ? new SubscriptionPrice(price) : undefined,
      currency: new SubscriptionCurrency(currency),
      nickname: nickname ? new SubscriptionNickname(nickname) : undefined,
      taxBehavior: taxBehavior ? new SubscriptionTaxBehaviour(taxBehavior) : undefined,
      created: new UnixDate(created),
      currentPeriodStart: new UnixDate(currentPeriodStart),
      currentPeriodEnd: new UnixDate(currentPeriodEnd),
      billingCycleAnchor: new SubscriptionBillingCycleAnchor(billingCycleAnchor),
      collectionMethod: new SubscriptionCollectionMethod(collectionMethod),
      cancelAt: cancelAt ? new UnixDate(cancelAt) : undefined,
      cancelAtPeriodEnd,
      canceledAt: canceledAt ? new UnixDate(canceledAt) : undefined,
      cancellationDetails: new SubscriptionCancellationDetails(cancellationDetails),
      endedAt: endedAt ? new UnixDate(endedAt) : undefined,
      daysUntilDue: daysUntilDue ? new SubscriptionDaysUntilDue(daysUntilDue) : undefined,
      defaultPaymentMethod: defaultPaymentMethod ? new SubscriptionDefaultPaymentMethod(defaultPaymentMethod) : undefined,
      defaultTaxRates: defaultTaxRates?.map((rate) => new SubscriptionDefaultTaxRate(rate)),
      discount: discount ? new SubscriptionDiscount(discount) : undefined,
      latestInvoice: latestInvoice ? new SubscriptionLatestInvoice(latestInvoice) : undefined,
    });

    await this.repository.save(subscription);
  }
}
