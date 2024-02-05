import { Subscription } from './Subscription';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<void>;
}
