import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../domain/value-object/UserId';

export class UserDeleter {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<void> {
    return this.repository.delete(new UserId(id));
  }
}
