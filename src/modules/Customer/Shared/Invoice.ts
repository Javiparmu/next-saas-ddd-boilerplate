export interface Invoice {
  invoicePrefix?: string;
  nextInvoiceSequence?: number;
  invoiceSettings?: string;
  invoiceCreditBalance?: Record<string, number>;
}
