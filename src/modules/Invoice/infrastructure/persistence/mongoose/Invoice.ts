import { CustomerEmail } from '@/modules/Customer/domain/value-object/CustomerEmail';
import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { InvoiceBillingReason } from '@/modules/Invoice/domain/value-object/InvoiceBillingReason';
import { InvoiceCharge } from '@/modules/Invoice/domain/value-object/InvoiceCharge';
import { InvoiceHostedUrl } from '@/modules/Invoice/domain/value-object/InvoiceHostedUrl';
import { InvoiceId } from '@/modules/Invoice/domain/value-object/InvoiceId';
import { InvoiceNumber } from '@/modules/Invoice/domain/value-object/InvoiceNumber';
import { InvoicePdf } from '@/modules/Invoice/domain/value-object/InvoicePdf';
import { InvoiceStatus } from '@/modules/Invoice/domain/value-object/InvoiceStatus';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';
import { Schema, model, models } from 'mongoose';

const invoiceSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (id: string) => new InvoiceId(id),
      set: (id: InvoiceId) => id.value,
    },
    billing_reason: {
      type: String,
      enum: [
        'subscription_create',
        'subscription_cycle',
        'subscription_threshold',
        'subscription_update',
        'subscription',
        'manual',
        'upcoming',
      ],
      get: (reason: string) => new InvoiceBillingReason(reason),
      set: (reason: InvoiceBillingReason) => reason?.value,
    },
    charge: {
      type: String,
      get: (charge: string) => new InvoiceCharge(charge),
      set: (charge: InvoiceCharge) => charge?.value,
    },
    customer: {
      type: String,
      get: (customer: string) => new CustomerId(customer),
      set: (customer: CustomerId) => customer?.value,
    },
    customerEmail: {
      type: String,
      get: (email: string) => new CustomerEmail(email),
      set: (email: CustomerEmail) => email?.value,
    },
    total: {
      type: Number,
      set: (total: number) => (total ? total / 100 : total),
    },
    subtotal: {
      type: Number,
      set: (subtotal: number) => (subtotal ? subtotal / 100 : subtotal),
    },
    pdf: {
      type: String,
      get: (url: string) => new InvoicePdf(url),
      set: (url: InvoicePdf) => url?.value,
    },
    hostedInvoiceUrl: {
      type: String,
      get: (url: string) => new InvoiceHostedUrl(url),
      set: (url: InvoiceHostedUrl) => url?.value,
    },
    number: {
      type: String,
      get: (number: string) => new InvoiceNumber(number),
      set: (number: InvoiceNumber) => number?.value,
    },
    receiptNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'open', 'paid', 'uncollectible', 'void'],
      get: (status: string) => new InvoiceStatus(status),
      set: (status: InvoiceStatus) => status?.value,
    },
    subscription: {
      type: String,
      get: (subscription: string) => new SubscriptionId(subscription),
      set: (subscription: SubscriptionId) => subscription?.value,
    },
    created: {
      type: Number,
      get: (created: number) => new UnixDate(created),
      set: (created: UnixDate) => created?.value,
    },
    tax: Number,
    refunded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    collection: 'invoices',
  },
);

export default models?.Invoice || model('Invoice', invoiceSchema);
