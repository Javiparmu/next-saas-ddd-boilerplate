import { ValidUserSubscriptionFinder } from '@/modules/User/application/ValidUserSubscriptionFinder';
import { MongoUserSubscriptionRepository } from '@/modules/User/infrastructure/persistence/MongoUserSubscriptionRepository';

interface Subscription {
  plan: string;
  userId: string;
}

export const checkSubscription = async (userId?: string): Promise<Subscription | null> => {
  if (!userId) {
    return null;
  }

  const userSubscriptionFinder = new ValidUserSubscriptionFinder(new MongoUserSubscriptionRepository());
  const userSubscription = await userSubscriptionFinder.run(userId);

  if (!userSubscription) {
    return null;
  }

  return {
    plan: userSubscription.id.value,
    userId: userSubscription.userId!.value,
  };
};
