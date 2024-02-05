import { Address } from '@/modules/Customer/Shared/Address';
import { Invoice } from '@/modules/Customer/Shared/Invoice';

export interface CustomerDocument {
  _id: string;
  email: string;
  name: string;
  address: Address;
  phone: string;
  invoice: Invoice;
  currency: string;
  discount: string;
  description: string;
  created: number;
}
