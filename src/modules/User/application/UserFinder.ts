import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { UserEmail } from '../domain/value-object/UserEmail';
import { UserId } from '../domain/value-object/UserId';

export class UserFinder {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(email: string): Promise<User | null> {
    return this.repository.searchByEmail(new UserEmail(email));
  }

  async runById(id: string): Promise<User | null> {
    return this.repository.search(new UserId(id));
  }

  async runByProviderAccountId(providerAccountId: string): Promise<User | null> {
    return this.repository.searchByProviderAccountId(providerAccountId);
  }
}
