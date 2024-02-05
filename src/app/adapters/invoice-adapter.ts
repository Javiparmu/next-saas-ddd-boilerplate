import type { Stripe } from 'stripe';

interface AdaptedInvoice {
  id: string;
  created: number;
  billingReason?: string;
  charge?: string;
  customer?: string;
  customerEmail?: string;
  pdf?: string;
  hostedInvoiceUrl?: string;
  number?: string;
  status?: string;
  subscription?: string;
  total?: number;
  subtotal?: number;
  tax?: number;
  receiptNumber?: string;
}

export const createInvoiceAdapter = (invoice: Stripe.Invoice): AdaptedInvoice => ({
  id: invoice.id,
  customer: invoice.customer?.toString(),
  customerEmail: invoice.customer_email?.toString(),
  pdf: invoice.invoice_pdf?.toString(),
  hostedInvoiceUrl: invoice.hosted_invoice_url?.toString(),
  number: invoice.number?.toString(),
  status: invoice.status?.toString(),
  subscription: invoice.subscription?.toString(),
  created: invoice.created,
  billingReason: invoice.billing_reason?.toString(),
  charge: invoice.charge?.toString(),
  receiptNumber: invoice.receipt_number?.toString(),
  total: invoice.total,
  subtotal: invoice.subtotal,
  tax: invoice.tax ? invoice.tax : undefined,
});
