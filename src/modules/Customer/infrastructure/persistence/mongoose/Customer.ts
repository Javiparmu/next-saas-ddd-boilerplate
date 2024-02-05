import { Address } from '@/modules/Customer/Shared/Address';
import { Invoice } from '@/modules/Customer/Shared/Invoice';
import { CustomerAddress } from '@/modules/Customer/domain/value-object/CustomerAddress';
import { CustomerCurrency } from '@/modules/Customer/domain/value-object/CustomerCurrency';
import { CustomerDescription } from '@/modules/Customer/domain/value-object/CustomerDescription';
import { CustomerDiscount } from '@/modules/Customer/domain/value-object/CustomerDiscount';
import { CustomerEmail } from '@/modules/Customer/domain/value-object/CustomerEmail';
import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { CustomerInvoice } from '@/modules/Customer/domain/value-object/CustomerInvoice';
import { CustomerName } from '@/modules/Customer/domain/value-object/CustomerName';
import { CustomerPhone } from '@/modules/Customer/domain/value-object/CustomerPhone';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { Schema, model, models } from 'mongoose';

const customerSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (id: string) => new CustomerId(id),
      set: (id: CustomerId) => id.value,
    },
    email: {
      type: String,
      get: (email: string) => new CustomerEmail(email),
      set: (email: CustomerEmail) => email?.value,
    },
    name: {
      type: String,
      get: (name: string) => new CustomerName(name),
      set: (name: CustomerName) => name?.value,
    },
    address: {
      type: Object,
      get: (address: Address) => new CustomerAddress(address),
      set: (address: CustomerAddress) => address?.value,
    },
    phone: {
      type: Number,
      get: (phone: string) => new CustomerPhone(phone),
      set: (phone: CustomerPhone) => phone?.value,
    },
    invoice: {
      type: Object,
      get: (invoice: Invoice) => new CustomerInvoice(invoice),
      set: (invoice: CustomerInvoice) => invoice?.value,
    },
    currency: {
      type: String,
      get: (currency: string) => new CustomerCurrency(currency),
      set: (currency: CustomerCurrency) => currency?.value,
    },
    discount: {
      type: String,
      get: (discount: string) => new CustomerDiscount(discount),
      set: (discount: CustomerDiscount) => discount?.value,
    },
    description: {
      type: String,
      get: (description: string) => new CustomerDescription(description),
      set: (description: CustomerDescription) => description?.value,
    },
    created: {
      type: Number,
      get: (created: number) => new UnixDate(created),
      set: (created: UnixDate) => created?.value,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    collection: 'customers',
  },
);

export default models?.Customer || model('Customer', customerSchema);
