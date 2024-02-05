import { Invoice } from './Invoice';

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>;
}
