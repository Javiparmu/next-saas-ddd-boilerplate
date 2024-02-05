import { Primitives } from '@/modules/Shared/domain/Primitives';
import { InvoiceId } from './value-object/InvoiceId';
import { AggregateRoot } from '@/modules/Shared/domain/AggregateRoot';
import { InvoiceBillingReason } from './value-object/InvoiceBillingReason';
import { InvoiceCharge } from './value-object/InvoiceCharge';
import { InvoiceNumber } from './value-object/InvoiceNumber';
import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { CustomerEmail } from '@/modules/Customer/domain/value-object/CustomerEmail';
import { InvoicePdf } from './value-object/InvoicePdf';
import { InvoiceHostedUrl } from './value-object/InvoiceHostedUrl';
import { InvoiceStatus } from './value-object/InvoiceStatus';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { InvoiceReceiptNumber } from './value-object/InvoiceReceiptNumber';

export class Invoice extends AggregateRoot {
  readonly id: InvoiceId;
  readonly billingReason?: InvoiceBillingReason;
  readonly charge?: InvoiceCharge;
  readonly created: UnixDate;
  readonly customer?: CustomerId;
  readonly customerEmail?: CustomerEmail;
  readonly pdf?: InvoicePdf;
  readonly hostedInvoiceUrl?: InvoiceHostedUrl;
  readonly status?: InvoiceStatus;
  readonly subscription?: SubscriptionId;
  readonly number?: InvoiceNumber;
  readonly receiptNumber?: InvoiceReceiptNumber;
  readonly total?: number;
  readonly subtotal?: number;
  readonly tax?: number;
  readonly refunded?: boolean;

  constructor({
    id,
    billingReason,
    charge,
    created,
    customer,
    customerEmail,
    pdf,
    hostedInvoiceUrl,
    status,
    subscription,
    number,
    receiptNumber,
    total,
    subtotal,
    refunded,
  }: {
    id: InvoiceId;
    billingReason?: InvoiceBillingReason;
    charge?: InvoiceCharge;
    created: UnixDate;
    customer?: CustomerId;
    customerEmail?: CustomerEmail;
    pdf?: InvoicePdf;
    hostedInvoiceUrl?: InvoiceHostedUrl;
    status?: InvoiceStatus;
    subscription?: SubscriptionId;
    number?: InvoiceNumber;
    receiptNumber?: InvoiceReceiptNumber;
    total?: number;
    subtotal?: number;
    refunded?: boolean;
  }) {
    super();
    this.id = id;
    this.billingReason = billingReason;
    this.charge = charge;
    this.created = created;
    this.customer = customer;
    this.customerEmail = customerEmail;
    this.pdf = pdf;
    this.hostedInvoiceUrl = hostedInvoiceUrl;
    this.status = status;
    this.subscription = subscription;
    this.number = number;
    this.receiptNumber = receiptNumber;
    this.total = total;
    this.subtotal = subtotal;
    this.refunded = refunded;
  }

  static fromPrimitives({
    id,
    billingReason,
    charge,
    created,
    customer,
    customerEmail,
    pdf,
    hostedInvoiceUrl,
    status,
    subscription,
    number,
    receiptNumber,
    total,
    subtotal,
    refunded,
  }: Primitives<Invoice>): Invoice {
    return new Invoice({
      id: new InvoiceId(id),
      billingReason: billingReason ? new InvoiceBillingReason(billingReason) : undefined,
      charge: charge ? new InvoiceCharge(charge) : undefined,
      created: new UnixDate(created),
      customer: customer ? new CustomerId(customer) : undefined,
      customerEmail: customerEmail ? new CustomerEmail(customerEmail) : undefined,
      pdf: pdf ? new InvoicePdf(pdf) : undefined,
      hostedInvoiceUrl: hostedInvoiceUrl ? new InvoiceHostedUrl(hostedInvoiceUrl) : undefined,
      status: status ? new InvoiceStatus(status) : undefined,
      subscription: subscription ? new SubscriptionId(subscription) : undefined,
      number: number ? new InvoiceNumber(number) : undefined,
      receiptNumber: receiptNumber ? new InvoiceReceiptNumber(receiptNumber) : undefined,
      total,
      subtotal,
      refunded,
    });
  }

  toPrimitives(): Primitives<Invoice> {
    return {
      id: this.id.value,
      billingReason: this.billingReason?.value,
      charge: this.charge?.value,
      created: this.created.value,
      customer: this.customer?.value,
      customerEmail: this.customerEmail?.value,
      pdf: this.pdf?.value,
      hostedInvoiceUrl: this.hostedInvoiceUrl?.value,
      status: this.status?.value,
      subscription: this.subscription?.value,
      number: this.number?.value,
      receiptNumber: this.receiptNumber?.value,
      total: this.total,
      subtotal: this.subtotal,
      refunded: this.refunded,
    };
  }
}
