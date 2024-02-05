export interface InvoiceDocument {
  _id: string;
  created: number;
  billingReason: string;
  charge: string;
  customer: string;
  customerEmail: string;
  pdf: string;
  hostedInvoiceUrl: string;
  number: string;
  status: string;
  subscription: string;
  total: number;
  subtotal: number;
  tax: number;
  receiptNumber: string;
  refunded: boolean;
}
