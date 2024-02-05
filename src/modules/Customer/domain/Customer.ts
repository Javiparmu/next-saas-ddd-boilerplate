import { Primitives } from '@/modules/Shared/domain/Primitives';
import { CustomerEmail } from './value-object/CustomerEmail';
import { CustomerId } from './value-object/CustomerId';
import { CustomerName } from './value-object/CustomerName';
import { CustomerDiscount } from './value-object/CustomerDiscount';
import { CustomerInvoice } from './value-object/CustomerInvoice';
import { CustomerDescription } from './value-object/CustomerDescription';
import { CustomerPhone } from './value-object/CustomerPhone';
import { AggregateRoot } from '@/modules/Shared/domain/AggregateRoot';
import { CustomerAddress } from './value-object/CustomerAddress';
import { CustomerCurrency } from './value-object/CustomerCurrency';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';

export class Customer extends AggregateRoot {
  readonly id: CustomerId;
  readonly email?: CustomerEmail;
  readonly name?: CustomerName;
  readonly address?: CustomerAddress;
  readonly phone?: CustomerPhone;
  readonly invoice?: CustomerInvoice;
  readonly currency?: CustomerCurrency;
  readonly discount?: CustomerDiscount;
  readonly description?: CustomerDescription;
  readonly created?: UnixDate;
  readonly deleted?: boolean;

  constructor({
    id,
    email,
    name,
    address,
    phone,
    invoice,
    currency,
    discount,
    description,
    created,
    deleted,
  }: {
    id: CustomerId;
    email?: CustomerEmail;
    name?: CustomerName;
    address?: CustomerAddress;
    phone?: CustomerPhone;
    invoice?: CustomerInvoice;
    currency?: CustomerCurrency;
    discount?: CustomerDiscount;
    description?: CustomerDescription;
    created?: UnixDate;
    deleted?: boolean;
  }) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.invoice = invoice;
    this.currency = currency;
    this.discount = discount;
    this.description = description;
    this.created = created;
    this.deleted = deleted;
  }

  static fromPrimitives({
    id,
    email,
    name,
    address,
    phone,
    invoice,
    currency,
    discount,
    description,
    created,
    deleted,
  }: Primitives<Customer>): Customer {
    return new Customer({
      id: new CustomerId(id),
      email: new CustomerEmail(email!),
      name: name ? new CustomerName(name) : undefined,
      address: new CustomerAddress(address!),
      phone: new CustomerPhone(phone!),
      invoice: new CustomerInvoice(invoice!),
      currency: new CustomerCurrency(currency!),
      discount: new CustomerDiscount(discount!),
      description: new CustomerDescription(description!),
      created: new UnixDate(created!),
      deleted,
    });
  }

  toPrimitives(): Primitives<Customer> {
    return {
      id: this.id.value,
      email: this.email?.value,
      name: this.name?.value,
      address: this.address?.value,
      phone: this.phone?.value,
      invoice: this.invoice?.value,
      currency: this.currency?.value,
      discount: this.discount?.value,
      description: this.description?.value,
      created: this.created?.value,
      deleted: this.deleted,
    };
  }
}
