import { VerificationTokenRepository } from '../domain/VerificationTokenRepository';
import { VerificationTokenId } from '../domain/value-object/VerificationTokenId';

export class VerificationTokenDeleter {
  private repository: VerificationTokenRepository;

  constructor(repository: VerificationTokenRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<void> {
    await this.repository.delete(new VerificationTokenId(id));
  }
}
