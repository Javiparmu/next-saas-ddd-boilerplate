import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { Subscription } from '../../domain/Subscription';
import SubscriptionModel from './mongoose/Subscription';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { SubscriptionDocument } from './mongoose/documents';
import { SubscriptionId } from '../../domain/value-object/SubscriptionId';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { SubscriptionDefaultTaxRate } from '../../domain/value-object/SubcriptionDefaultTaxRate';

export class MongoSubscriptionRepository extends MongoRepository<Subscription> implements SubscriptionRepository {
  constructor() {
    super(SubscriptionModel);
  }

  public async save(subscription: Subscription): Promise<void> {
    const newSubscription = new Subscription({
      ...subscription,
      defaultTaxRates: [
        new SubscriptionDefaultTaxRate({
          country: 'ES',
          state: 'Barcelona',
          effectivePercentage: 21,
          active: true,
          percentage: 21,
        }),
      ],
    });
    await this.persist(subscription.id, newSubscription);
  }

  public async search(subscriptionId: SubscriptionId): Promise<Subscription | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const subscription = await SubscriptionModel.findOne({ subscriptionId }).lean<SubscriptionDocument>();

    return subscription ? Subscription.fromPrimitives({ ...subscription, id: subscription._id }) : null;
  }
}
