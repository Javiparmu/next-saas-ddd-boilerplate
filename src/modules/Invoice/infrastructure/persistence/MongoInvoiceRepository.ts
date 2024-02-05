import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { Invoice } from '../../domain/Invoice';
import InvoiceModel from './mongoose/Invoice';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { InvoiceDocument } from './mongoose/documents';
import { InvoiceId } from '../../domain/value-object/InvoiceId';
import { InvoiceRepository } from '../../domain/InvoiceRepository';

export class MongoInvoiceRepository extends MongoRepository<Invoice> implements InvoiceRepository {
  constructor() {
    super(InvoiceModel);
  }

  public async save(invoice: Invoice): Promise<void> {
    await this.persist(invoice.id, invoice);
  }

  public async search(invoiceId: InvoiceId): Promise<Invoice | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const invoice = await InvoiceModel.findOne({ invoiceId }).lean<InvoiceDocument>();

    return invoice ? Invoice.fromPrimitives({ ...invoice, id: invoice._id }) : null;
  }
}
