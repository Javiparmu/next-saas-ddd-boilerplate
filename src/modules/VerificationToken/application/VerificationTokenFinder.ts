import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';
import { VerificationToken } from '../domain/VerificationToken';
import { VerificationTokenRepository } from '../domain/VerificationTokenRepository';
import { Token } from '../domain/value-object/Token';

export class VerificationTokenFinder {
  private repository: VerificationTokenRepository;

  constructor(repository: VerificationTokenRepository) {
    this.repository = repository;
  }

  async runByEmail(email: string): Promise<VerificationToken | null> {
    return this.repository.findByEmail(new UserEmail(email));
  }

  async runByToken(token: string): Promise<VerificationToken | null> {
    return this.repository.findByToken(new Token(token));
  }
}
