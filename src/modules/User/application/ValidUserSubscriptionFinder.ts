import { UserSubscription } from '../domain/UserSubscription';
import { UserSubscriptionRepository } from '../domain/UserSubscriptionRepository';
import { UserId } from '../domain/value-object/UserId';

export class ValidUserSubscriptionFinder {
  private repository: UserSubscriptionRepository;

  constructor(repository: UserSubscriptionRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<UserSubscription | null> {
    return this.repository.searchValid(new UserId(id));
  }
}
