import { Model } from 'mongoose';
import { AggregateRoot } from '../../domain/AggregateRoot';
import { StringValueObject } from '../../domain/value-object/StringValueObject';
import { MongooseConnection } from './MongooseConnection';

export class MongoRepository<T extends AggregateRoot> {
  constructor(readonly model: Model<T>) {}

  public async persist(id: StringValueObject, aggregateRoot: T): Promise<void> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const document = { ...aggregateRoot, _id: id };
    await this.model.updateOne({ _id: id }, { $set: document }, { upsert: true, strict: true });
  }
}
