import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';
import { VerificationToken } from '../domain/VerificationToken';
import { VerificationTokenRepository } from '../domain/VerificationTokenRepository';
import { Primitives } from '@/modules/Shared/domain/Primitives';
import { VerificationTokenId } from '../domain/value-object/VerificationTokenId';
import { Token } from '../domain/value-object/Token';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';

export class VerificationTokenCreator {
  private repository: VerificationTokenRepository;

  constructor(repository: VerificationTokenRepository) {
    this.repository = repository;
  }

  async run(verificationToken: Primitives<VerificationToken>): Promise<void> {
    await this.repository.save(
      new VerificationToken({
        id: new VerificationTokenId(verificationToken.id),
        email: new UserEmail(verificationToken.email),
        token: new Token(verificationToken.token),
        expiresAt: new UnixDate(verificationToken.expiresAt),
      }),
    );
  }
}
