import { Invoice } from '../../Shared/Invoice';

export class CustomerInvoice {
  readonly value: Invoice;

  constructor({ invoicePrefix, nextInvoiceSequence, invoiceSettings, invoiceCreditBalance }: Invoice) {
    this.value = {
      invoicePrefix,
      nextInvoiceSequence,
      invoiceSettings,
      invoiceCreditBalance,
    };
  }
}
