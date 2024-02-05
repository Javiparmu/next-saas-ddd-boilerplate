import { CustomerRepository } from '../domain/CustomerRepository';
import { CustomerId } from '../domain/value-object/CustomerId';
import { Customer } from '../domain/Customer';
import { CustomerCurrency } from '../domain/value-object/CustomerCurrency';
import { CustomerDiscount } from '../domain/value-object/CustomerDiscount';
import { Invoice } from '../Shared/Invoice';
import { CustomerEmail } from '../domain/value-object/CustomerEmail';
import { CustomerName } from '../domain/value-object/CustomerName';
import { CustomerAddress } from '../domain/value-object/CustomerAddress';
import { CustomerInvoice } from '../domain/value-object/CustomerInvoice';
import { CustomerDescription } from '../domain/value-object/CustomerDescription';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { Address } from '../Shared/Address';

export class CustomerCreator {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run({
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
  }): Promise<void> {
    const customer = new Customer({
      id: new CustomerId(id),
      email: email ? new CustomerEmail(email) : undefined,
      name: name ? new CustomerName(name) : undefined,
      address: new CustomerAddress(address),
      phone: phone ? new CustomerCurrency(phone) : undefined,
      invoice: new CustomerInvoice(invoice),
      currency: currency ? new CustomerCurrency(currency) : undefined,
      discount: discount ? new CustomerDiscount(discount) : undefined,
      description: description ? new CustomerDescription(description) : undefined,
      created: new UnixDate(created),
      deleted,
    });

    await this.repository.save(customer);
  }
}
