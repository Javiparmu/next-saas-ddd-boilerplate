import { Address } from '@/modules/Customer/Shared/Address';
import { Invoice } from '@/modules/Customer/Shared/Invoice';
import type { Stripe } from 'stripe';

interface AdaptedCustomer {
  id: string;
  email?: string;
  name?: string;
  address: Address;
  phone?: string;
  invoice: Invoice;
  currency?: string;
  discount?: string;
  description?: string;
  created: number;
  deleted: boolean;
}

export const createCustomerAdapter = (customer: Stripe.Customer): AdaptedCustomer => ({
  id: customer.id,
  email: customer.email!,
  address: {
    city: customer.address?.city?.toString(),
    country: customer.address?.country?.toString(),
    line1: customer.address?.line1?.toString(),
    line2: customer.address?.line2?.toString(),
    postalCode: customer.address?.postal_code?.toString(),
    state: customer.address?.state?.toString(),
  },
  name: customer.name?.toString(),
  phone: customer.phone?.toString(),
  created: customer.created,
  currency: customer.currency?.toString(),
  description: customer.description?.toString(),
  discount: customer.discount?.id,
  invoice: {
    invoicePrefix: customer.invoice_prefix?.toString(),
    nextInvoiceSequence: customer.next_invoice_sequence ?? undefined,
    invoiceCreditBalance: customer.invoice_credit_balance ?? undefined,
    invoiceSettings: customer.invoice_settings.default_payment_method?.toString(),
  },
  deleted: customer.deleted ?? false,
});
