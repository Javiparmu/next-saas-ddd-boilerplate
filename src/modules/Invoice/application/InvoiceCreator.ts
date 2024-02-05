import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { Invoice } from '../domain/Invoice';
import { InvoiceRepository } from '../domain/InvoiceRepository';
import { InvoiceId } from '../domain/value-object/InvoiceId';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { InvoiceStatus } from '../domain/value-object/InvoiceStatus';
import { InvoiceNumber } from '../domain/value-object/InvoiceNumber';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { InvoiceBillingReason } from '../domain/value-object/InvoiceBillingReason';
import { InvoiceCharge } from '../domain/value-object/InvoiceCharge';
import { CustomerEmail } from '@/modules/Customer/domain/value-object/CustomerEmail';
import { InvoicePdf } from '../domain/value-object/InvoicePdf';
import { InvoiceHostedUrl } from '../domain/value-object/InvoiceHostedUrl';

export class InvoiceCreator {
  private repository: InvoiceRepository;

  constructor(repository: InvoiceRepository) {
    this.repository = repository;
  }

  async run({
    id,
    customer,
    subscription,
    status,
    number,
    created,
    billingReason,
    charge,
    customerEmail,
    pdf,
    hostedInvoiceUrl,
    receiptNumber,
    total,
    subtotal,
    refunded,
  }: {
    id: string;
    customer?: string;
    subscription?: string;
    status?: string;
    number?: string;
    created: number;
    billingReason?: string;
    charge?: string;
    customerEmail?: string;
    pdf?: string;
    hostedInvoiceUrl?: string;
    receiptNumber?: string;
    total?: number;
    subtotal?: number;
    refunded?: boolean;
  }): Promise<void> {
    const invoice = new Invoice({
      id: new InvoiceId(id),
      customer: customer ? new CustomerId(customer) : undefined,
      subscription: subscription ? new SubscriptionId(subscription) : undefined,
      status: status ? new InvoiceStatus(status) : undefined,
      number: number ? new InvoiceNumber(number) : undefined,
      created: new UnixDate(created),
      billingReason: billingReason ? new InvoiceBillingReason(billingReason) : undefined,
      charge: charge ? new InvoiceCharge(charge) : undefined,
      customerEmail: customerEmail ? new CustomerEmail(customerEmail) : undefined,
      pdf: pdf ? new InvoicePdf(pdf) : undefined,
      hostedInvoiceUrl: hostedInvoiceUrl ? new InvoiceHostedUrl(hostedInvoiceUrl) : undefined,
      receiptNumber: receiptNumber ? new InvoiceNumber(receiptNumber) : undefined,
      total,
      subtotal,
      refunded,
    });

    await this.repository.save(invoice);
  }
}
