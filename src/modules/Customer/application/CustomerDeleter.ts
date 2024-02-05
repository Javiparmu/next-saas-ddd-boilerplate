import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository';
import { CustomerId } from '../domain/value-object/CustomerId';

export class CustomerDeleter {
  private repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<void> {
    const updateCustomer = new Customer({
      id: new CustomerId(id),
      deleted: true,
    });

    await this.repository.save(updateCustomer);
  }
}
