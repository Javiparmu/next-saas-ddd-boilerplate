import { User } from './User';
import { UserSubscription } from './UserSubscription';
import { UserEmail } from './value-object/UserEmail';
import { UserId } from './value-object/UserId';
import { UserIp } from './value-object/UserIp';

export interface UserRepository {
  save(user: User): Promise<void>;
  search(id: UserId): Promise<User | null>;
  searchByEmail(email: UserEmail): Promise<User | null>;
  searchByProviderAccountId(providerAccountId: string): Promise<User | null>;
  delete: (id: UserId) => Promise<void>;
  subscribe(subscription: UserSubscription): Promise<void>;
  getIsSubscribed(id: UserId): Promise<boolean>;
}
