import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository';
import { CustomerId } from '../domain/value-object/CustomerId';

export class CustomerFinder {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<Customer | null> {
    return this.repository.search(new CustomerId(id));
  }
}
