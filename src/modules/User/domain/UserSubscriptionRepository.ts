import { UserSubscription } from './UserSubscription';
import { UserId } from './value-object/UserId';

export interface UserSubscriptionRepository {
  save(subscription: UserSubscription): Promise<void>;
  search(id: UserId): Promise<UserSubscription | null>;
  searchValid(id: UserId): Promise<UserSubscription | null>;
}
