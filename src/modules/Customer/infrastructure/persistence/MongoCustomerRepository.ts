import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { Customer } from '../../domain/Customer';
import CustomerModel from './mongoose/Customer';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { CustomerDocument } from './mongoose/documents';
import { CustomerId } from '../../domain/value-object/CustomerId';
import { CustomerRepository } from '../../domain/CustomerRepository';
import { CustomerEmail } from '../../domain/value-object/CustomerEmail';

export class MongoCustomerRepository extends MongoRepository<Customer> implements CustomerRepository {
  constructor() {
    super(CustomerModel);
  }

  public async save(customer: Customer): Promise<void> {
    await this.persist(customer.id, customer);
  }

  public async search(customerId: CustomerId): Promise<Customer | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const customer = await CustomerModel.findOne({ customerId }).lean<CustomerDocument>();

    return customer ? Customer.fromPrimitives({ ...customer, id: customer._id }) : null;
  }

  public async searchByEmail(email: CustomerEmail): Promise<Customer | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const customer = await CustomerModel.findOne({ email }).lean<CustomerDocument>();

    return customer ? Customer.fromPrimitives({ ...customer, id: customer._id }) : null;
  }
}
