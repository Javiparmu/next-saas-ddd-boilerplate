import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import UserModel from '@/modules/User/infrastructure/persistence/mongoose/User';
import { UserId } from '../../domain/value-object/UserId';
import { UserEmail } from '../../domain/value-object/UserEmail';
import { UserDocument } from './mongoose/documents';
import { MongoUserSubscriptionRepository } from './MongoUserSubscriptionRepository';
import { UserSubscription } from '../../domain/UserSubscription';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { SubscriptionId } from '@/modules/Subscription/domain/value-object/SubscriptionId';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  private readonly userSubscriptionRepository = new MongoUserSubscriptionRepository();

  constructor() {
    super(UserModel);
  }

  public async save(user: User): Promise<void> {
    await this.persist(user.id, user);
  }

  public async search(id: UserId): Promise<User | null> {
    await MongooseConnection.connect();

    const user = await UserModel.findById(id).lean<UserDocument>();

    return user ? User.fromPrimitives({ ...user, id: user._id }) : null;
  }

  public async searchByEmail(email: UserEmail): Promise<User | null> {
    await MongooseConnection.connect();

    const user = await UserModel.findOne({ email }).lean<UserDocument>();

    return user ? User.fromPrimitives({ ...user, id: user._id }) : null;
  }

  public async searchByProviderAccountId(providerAccountId: string): Promise<User | null> {
    await MongooseConnection.connect();

    const user = await UserModel.findOne({ providerAccountId }).lean<UserDocument>();

    return user ? User.fromPrimitives({ ...user, id: user._id }) : null;
  }

  public async subscribe(subscription: UserSubscription): Promise<void> {
    await MongooseConnection.connect();

    await this.userSubscriptionRepository.save(subscription);

    const user = new User({
      id: subscription.userId!,
      plan: new SubscriptionId(subscription.id.value),
    });

    await this.save(user);
  }

  public async getIsSubscribed(id: UserId): Promise<boolean> {
    const userSubscription = await this.userSubscriptionRepository.searchValid(id);

    return !!userSubscription;
  }

  public async delete(id: UserId): Promise<void> {
    await MongooseConnection.connect();

    await UserModel.findByIdAndDelete(id);
  }
}
