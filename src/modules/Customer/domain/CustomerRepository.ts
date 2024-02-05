import { Customer } from './Customer';
import { CustomerId } from './value-object/CustomerId';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  search(id: CustomerId): Promise<Customer | null>;
}
