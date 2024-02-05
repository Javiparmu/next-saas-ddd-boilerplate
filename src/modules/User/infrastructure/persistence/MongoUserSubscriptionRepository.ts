import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { UserSubscription } from '../../domain/UserSubscription';
import { UserSubscriptionRepository } from '../../domain/UserSubscriptionRepository';
import { UserId } from '../../domain/value-object/UserId';
import UserSubscriptionModel from './mongoose/UserSubscription';
import { UserSubscriptionDocument } from './mongoose/documents';
import { MONTH_IN_MS } from '../../Shared/constants';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';

export class MongoUserSubscriptionRepository extends MongoRepository<UserSubscription> implements UserSubscriptionRepository {
  constructor() {
    super(UserSubscriptionModel);
  }

  public async save(userSubscription: UserSubscription): Promise<void> {
    await this.persist(userSubscription.id, userSubscription);
  }

  public async search(userId: UserId): Promise<UserSubscription | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const userSubscription = await UserSubscriptionModel.findOne({ userId }).lean<UserSubscriptionDocument>();

    return userSubscription ? UserSubscription.fromPrimitives({ ...userSubscription, id: userSubscription._id }) : null;
  }

  public async searchValid(userId: UserId): Promise<UserSubscription | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const userSubscription = await UserSubscriptionModel.findOne({
      userId,
      stripeCurrentPeriodEnd: { $gt: Date.now() - MONTH_IN_MS },
    }).lean<UserSubscriptionDocument>();

    return userSubscription ? UserSubscription.fromPrimitives({ ...userSubscription, id: userSubscription._id }) : null;
  }
}
